import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { QuoteListComponent } from './components/quote-list/quote-list.component';
import { HttpClientModule } from '@angular/common/http';
import { SearchComponent } from './components/search/search.component';
import { Routes, RouterModule } from '@angular/router';
import { QuoteService } from './services/quote.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SourceMenuComponent } from './components/source-menu/source-menu.component';
import { AddQuoteComponent } from './components/add-quote/add-quote.component';


const routes: Routes = [
  { path: 'quotes/byKeyword/:keyword', component: QuoteListComponent },
  { path: 'quotes/byKeyword/', component: QuoteListComponent},
  { path: 'quotes/bySource/:id', component: QuoteListComponent },
  { path: 'quotes', component: QuoteListComponent },
  { path: '', redirectTo: '/quotes', pathMatch: 'full' },
  { path: '**', redirectTo: '/quotes', pathMatch: 'full'}
];

@NgModule({
  declarations: [
    AppComponent,
    QuoteListComponent,
    SearchComponent,
    SourceMenuComponent,
    AddQuoteComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    HttpClientModule,
    BrowserModule,
    NgbModule
  ],
  providers: [QuoteService],
  bootstrap: [AppComponent]
})

export class AppModule { }
