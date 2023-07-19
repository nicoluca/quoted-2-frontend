import { Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { QuoteListComponent } from './components/quote-list/quote-list.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { SearchComponent } from './components/search/search.component';
import { Routes, RouterModule, Router } from '@angular/router';
import { QuoteService } from './services/quote.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SourceMenuComponent } from './components/source-menu/source-menu.component';
import { AddQuoteComponent } from './components/add-quote/add-quote.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HighlighterPipe } from './pipes/highlighter.pipe';

import {
  OktaAuthModule,
  OktaCallbackComponent,
  OKTA_CONFIG, 
  OktaAuthGuard
} from '@okta/okta-angular';

import { OktaAuth } from '@okta/okta-auth-js';
import config from './config/config';
import { LoginComponent } from './components/login/login.component';
import { LoginStatusComponent } from './components/login-status/login-status.component';
import { AuthInterceptorService } from './services/auth-interceptor.service';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { SourceNavigationComponent } from './components/source-navigation/source-navigation.component';
import { ExportComponent } from './components/export/export.component';

const oktaConfig = config.oidc;
const oktaAuth = new OktaAuth(oktaConfig);

function sendToLoginPage(oktaAuth: OktaAuth, injector: Injector) {
  // Use injector to access any service available in your app
  const router = injector.get(Router);
  router.navigate(['/login']);
}

const routes: Routes = [
  { path: 'login/callback', component: OktaCallbackComponent },
  { path: 'login', component: LoginComponent },
  { path: 'quotes/byKeyword/:keyword', component: QuoteListComponent },
  // { path: 'quotes/byKeyword/', component: QuoteListComponent},
  { path: 'quotes/bySource/:id', component: QuoteListComponent },
  { path: 'quotes/findBySourceIsNull/:sourceIsNull', component: QuoteListComponent },
  { path: 'quotes', component: QuoteListComponent },
  { path: '', redirectTo: '/quotes', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    QuoteListComponent,
    SearchComponent,
    SourceMenuComponent,
    AddQuoteComponent,
    HighlighterPipe,
    LoginComponent,
    LoginStatusComponent,
    NotFoundComponent,
    SidebarComponent,
    SourceNavigationComponent,
    ExportComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    HttpClientModule,
    BrowserModule,
    NgbModule,
    FontAwesomeModule,
    OktaAuthModule
  ],
  providers: [QuoteService, { provide: OKTA_CONFIG, useValue: { oktaAuth }},
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true}],
  bootstrap: [AppComponent]
})

export class AppModule { }
