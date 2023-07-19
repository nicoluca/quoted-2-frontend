import { Component, Inject, OnInit } from '@angular/core';
import { OktaAuthStateService, OKTA_AUTH } from '@okta/okta-angular';
import { OktaAuth } from '@okta/okta-auth-js';
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
    @Inject(OKTA_AUTH) private oktaAuth: OktaAuth) { }

  ngOnInit(): void {
    this.oktaAuthService.authState$.subscribe(
      (result) => {
        console.log('Authentication result: ', result.isAuthenticated);
        this.isAuthenticated = result.isAuthenticated!;
        this.getUserDetails();
      }
    );
  }
  
  getUserDetails() {
    if (this.isAuthenticated) {
      this.oktaAuth.getUser().then(
        (res) => {
          this.userFullName = res.name as string;

          const email = res.email as string;
          this.storage.setItem('userEmail', JSON.stringify(email));
        }
      );
    }
  }


}
