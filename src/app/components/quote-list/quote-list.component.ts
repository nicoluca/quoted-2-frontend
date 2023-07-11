import { Component } from '@angular/core';
import { Quote } from 'src/app/domain/quote';
import { QuoteService } from 'src/app/services/quote.service';
import { ActivatedRoute, Router, RoutesRecognized } from '@angular/router';


@Component({
  selector: 'app-quote-list',
  templateUrl: './quote-list.component.html',
  styleUrls: ['./quote-list.component.css']
})
export class QuoteListComponent {
onSort($event: Event) {
throw new Error('Method not implemented.');
}

  quotes: Quote[] = []

  // pagination properties
  pageNumber: number = 1;
  pageSize: number = 10;
  totalElements: number = 0;

  // search properties
  searchMode: boolean = false;
  keyWord: string = '';
  previousKeyword: string = '';

  // filter properties
  filterMode: boolean = false;
  sourceId: number = 0;

  // null source properties
  nullSourceMode: boolean = false;

  constructor(private quoteService: QuoteService,
              private route: ActivatedRoute,
              private router: Router) {

  }

  ngOnInit(): void {
    this.router.events.subscribe(val => {
      if (val instanceof RoutesRecognized) {
          this.searchMode = val.state.root.firstChild?.params.hasOwnProperty('keyword') ?? false;
          this.keyWord = val.state.root.firstChild?.params['keyword'] ?? '';

          this.filterMode = val.state.root.firstChild?.params.hasOwnProperty('id') ?? false;
          this.sourceId = val.state.root.firstChild?.params['id'] ?? 0;

          this.nullSourceMode = val.state.root.firstChild?.params.hasOwnProperty('sourceIsNull') ?? false;
          
          this.listQuotes();
      }
    });
  }

  listQuotes() {
    if (this.searchMode)
      this.handleSearchQuotes(this.keyWord);
    else if (this.filterMode)
      this.handleFilterQuotes(this.sourceId);
    else if (this.nullSourceMode)
      this.handleListQuotesWithNullSource();
    else
      this.handleListQuotes();
  }

  handleSearchQuotes(keyword: string = '') {
    console.log(`keyword=${keyword}`);

    if (this.previousKeyword != keyword)
      this.pageNumber = 1;

    this.previousKeyword = keyword;

    this.quoteService.searchPageableQuotes(keyword, this.pageNumber - 1, this.pageSize).subscribe(
      this.processResult()
    );
  }

  handleFilterQuotes(sourceId: number) {
    console.log(`sourceId=${sourceId}`);

    this.quoteService.filterPageableQuotes(sourceId, this.pageNumber - 1, this.pageSize).subscribe(
      this.processResult()
    );
  }

  handleListQuotesWithNullSource() {
    console.log('Querying quotes with null source...');
    this.quoteService.getPageableQuotesWithNullSource(this.pageNumber - 1, this.pageSize).subscribe(
      this.processResult()
    );
  }

  handleListQuotes() {
    this.quoteService.getPageableQuotes(this.pageNumber - 1, this.pageSize).subscribe(
      this.processResult()
    );
  }

  processResult() {
    return (data: any) => {
      this.quotes = data._embedded.quotes;
      this.pageNumber = data.page.number + 1; // Spring Data REST pages are 0-based
      this.pageSize = data.page.size;
      this.totalElements = data.page.totalElements;
    }
  }

  updatePageSize(size: number) {
    this.pageSize = size;
    this.pageNumber = 1;
    this.listQuotes();
  }

  deleteQuote(quoteId: number) {
    console.log(`Delete quote with id=${quoteId}...`);
    this.quoteService.deleteQuote(quoteId).subscribe(
      response => {
        console.log(`Delete quote with id=${quoteId} response=${response.text}`);
        this.listQuotes();
      }
    );
  }

  updateQuote(arg0: number) {
    // TODO Auto-generated method stub
    throw new Error('Method not implemented.');
  }

}
