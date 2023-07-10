import { Component } from '@angular/core';
import { Quote } from 'src/app/domain/quote';
import { Source } from 'src/app/domain/source';
import { QuoteService } from 'src/app/services/quote.service';
import { SourceService } from 'src/app/services/source.service';

@Component({
  selector: 'app-source-menu',
  templateUrl: './source-menu.component.html',
  styleUrls: ['./source-menu.component.css']
})
export class SourceMenuComponent {

  sources: Source[] = [];
  quotesWithNullSource: Quote[] = [];

   // pagination properties
   pageNumber: number = 1;
   pageSize: number = 1000; // TODO: Implement actual pagination
   totalElements: number = 0;

  constructor(private sourceService: SourceService,
              private quoteService: QuoteService) { }

  ngOnInit(): void {
    this.sourceService.getPageableSources(this.pageNumber - 1, this.pageSize).subscribe(
      this.processResult()
    );

    this.quoteService.getPageableQuotesWithNullSource(this.pageNumber - 1, this.pageSize).subscribe(
      this.processResultQuotesWithNullSource()
    );
  }


  processResult() {
    return (data: any) => {
      this.sources = data._embedded.sources;
      this.pageNumber = data.page.number + 1; // Spring Data REST pages are 0-based
      this.pageSize = data.page.size;
      this.totalElements = data.page.totalElements;
    }
  }

  processResultQuotesWithNullSource() {
    return (data: any) => {
      this.quotesWithNullSource = data._embedded.quotes;
      this.pageNumber = data.page.number + 1; // Spring Data REST pages are 0-based
      this.pageSize = data.page.size;
      this.totalElements = data.page.totalElements;
    }
  }

}
