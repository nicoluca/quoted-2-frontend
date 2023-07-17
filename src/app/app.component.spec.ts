import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { SourceMenuComponent } from './components/source-menu/source-menu.component';
import { HttpClientModule } from '@angular/common/http';
import { AddQuoteComponent } from './components/add-quote/add-quote.component';
import { QuoteListComponent } from './components/quote-list/quote-list.component';
import { SearchComponent } from './components/search/search.component';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbPagination } from '@ng-bootstrap/ng-bootstrap';

describe('AppComponent', () => {
  beforeEach(() => TestBed.configureTestingModule({
    declarations: [AppComponent,
      SourceMenuComponent,
      AddQuoteComponent,
      QuoteListComponent,
      SearchComponent],
    imports: [HttpClientModule,
      RouterTestingModule,
      NgbPagination]
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'quoted'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('quoted');
  });
});
