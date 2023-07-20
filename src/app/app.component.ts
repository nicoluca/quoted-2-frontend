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
        this.getUserDetails();
      }
    );

    this.userService.getRefresh().subscribe(
      () => {
        if (this.isAuthenticated)
          this.setUUID();
      }
    );
  }

  setUUID() {
    this.userService.getUUID(this.storage.getItem('userEmail')!).subscribe(
      (data) => {
        console.log(`Setting session storage UUID to ${data.uuid}`)
        this.storage.setItem('uuid',  JSON.stringify(data.uuid));
      }
    );
  }
  
  getUserDetails() {
    if (this.isAuthenticated) {
      this.oktaAuth.getUser().then(
        (res) => {
          const email = res.email as string;
          console.log(`Setting session storage userEmail to: ${email}`)
          this.storage.setItem('userEmail', JSON.stringify(email));

          this.userService.refreshUUID();
        }
      );
    }
  }


}
