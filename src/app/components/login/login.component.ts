import { Component, Inject, OnInit } from '@angular/core';
import { OKTA_AUTH } from '@okta/okta-angular';
import { OktaAuth } from '@okta/okta-auth-js';
import OktaSignIn from '@okta/okta-signin-widget';

import config from '../../config/config';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  oktaSignin: any;

  constructor(@Inject(OKTA_AUTH) private oktaAuth: OktaAuth) {

    this.oktaSignin = new OktaSignIn({
      // logo: 'assets/images/logo.png', // TODO - add logo
      baseUrl: config.oidc.issuer.split('/oauth2')[0],
      clientId: config.oidc.clientId,
      redirectUri: config.oidc.redirectUri,
      useInteractionCodeFlow: config.oidc.useInteractionCodeFlow,
      useClassicEngine: config.oidc.useClassicEngine,
      authParams: {
        pkce: true,
        issuer: config.oidc.issuer,
        scopes: config.oidc.scopes
      },
      features: {
        registration: config.oidc.features.registration
      }
    });
   }

  ngOnInit(): void {
    this.oktaSignin.remove();

    this.oktaSignin.renderEl({
      el: '#okta-sign-in-widget'}, // this name should be same as div tag id in login.component.html
      (response: any) => {
        if (response.status === 'SUCCESS') {
          this.oktaAuth.signInWithRedirect();
        }
      },
      (error: any) => {
        throw error;
      }
    );
  }

}
