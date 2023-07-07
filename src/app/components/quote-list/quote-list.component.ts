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

  quotes: Quote[] = []

  // pagination properties
  pageNumber: number = 1;
  pageSize: number = 10;
  totalElements: number = 0;

  searchMode: boolean = false;
  keyWord: string = '';
  previousKeyword: string = '';

  constructor(private quoteService: QuoteService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    this.router.events.subscribe(val => {
      if (val instanceof RoutesRecognized) {
          this.searchMode = val.state.root.firstChild?.params.hasOwnProperty('keyword') ?? false;
          this.keyWord = val.state.root.firstChild?.params['keyword'] ?? '';

          this.listQuotes();
      }
    });
  }

  listQuotes() {
    if (this.searchMode)
      this.handleSearchQuotes(this.keyWord);
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

}
