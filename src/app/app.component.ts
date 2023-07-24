import { Component, Inject, OnInit } from '@angular/core';
import { OktaAuthStateService, OKTA_AUTH } from '@okta/okta-angular';
import { OktaAuth } from '@okta/okta-auth-js';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'quoted';

  storage: Storage = sessionStorage;

  isAuthenticated: boolean = false;
  userFullName: string = '';

  constructor(private oktaAuthService: OktaAuthStateService,
    @Inject(OKTA_AUTH) private oktaAuth: OktaAuth,
    private userService: UserService) { }

  ngOnInit(): void {
    this.oktaAuthService.authState$.subscribe(
      (result) => {
        console.log('Authentication result: ', result.isAuthenticated);
        this.isAuthenticated = result.isAuthenticated!;

        if (this.isAuthenticated) {
          this.getUserDetails();
          this.saveUser();
        }
      }
    );
  }
  saveUser() {
    this.userService.saveUser().subscribe(
      (res) => {
        console.log(`User saved: ${res.email}`);
      }
    );
  }
  
  getUserDetails() {
    this.oktaAuth.getUser().then(
      (res) => {
        const email = res.email as string;
        console.log(`Setting session storage userEmail to: ${email}`)
        this.storage.setItem('userEmail', JSON.stringify(email));
      }
    );
  }

}
