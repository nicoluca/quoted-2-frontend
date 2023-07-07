import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { QuoteListComponent } from './components/quote-list/quote-list.component';
import { HttpClientModule } from '@angular/common/http';
import { SearchComponent } from './components/search/search.component';
import { Routes, RouterModule } from '@angular/router';
import { QuoteService } from './services/quote.service';

const routes: Routes = [
  { path: 'search/:keyword', component: QuoteListComponent },
  { path: 'search/', component: QuoteListComponent},
  { path: 'quotes', component: QuoteListComponent },
  { path: '', redirectTo: '/quotes', pathMatch: 'full' },
  { path: '**', redirectTo: '/quotes', pathMatch: 'full'}
];

@NgModule({
  declarations: [
    AppComponent,
    QuoteListComponent,
    SearchComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    HttpClientModule,
    BrowserModule
  ],
  providers: [QuoteService],
  bootstrap: [AppComponent]
})

export class AppModule { }
