import { Component } from '@angular/core';
import { Quote } from 'src/app/domain/quote';
import { QuoteService } from 'src/app/services/quote.service';

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

  constructor(private quoteService: QuoteService) {
  }

  ngOnInit(): void {
    this.getQuotes();
    console.log(this.quotes);
  }

  getQuotes() {
    this.quoteService.getPageableQuotes(this.pageNumber - 1, this.pageSize).subscribe(
      this.processResult()
    );
  }

  processResult() {
    return (data: any) => {
      this.quotes = data._embedded.quotes;
      this.pageNumber = data.page.number + 1;
      this.pageSize = data.page.size;
      this.totalElements = data.page.totalElements;
    }
  }

}
