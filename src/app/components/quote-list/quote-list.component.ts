import { Component } from '@angular/core';
import { Quote } from 'src/app/domain/quote';
import { QuoteService } from 'src/app/services/quote.service';
import { ActivatedRoute, Router, RoutesRecognized } from '@angular/router';
import { faTrashAlt, faRefresh, faEdit } from '@fortawesome/free-solid-svg-icons';
import { SourceService } from 'src/app/services/source.service';
import { SearchService } from 'src/app/services/search.service';


@Component({
  selector: 'app-quote-list',
  templateUrl: './quote-list.component.html',
  styleUrls: ['./quote-list.component.css']
})
export class QuoteListComponent {

  
  // Font Awesome icons
  faTrashAlt = faTrashAlt;
  faRefresh = faRefresh;
  faEdit = faEdit;

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

  // Quote to edit
  quoteToEditId: number = 0;

  // Current search term
  searchTerm: string = '';



  constructor(private quoteService: QuoteService,
              private sourceService: SourceService,
              private searchService: SearchService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {

    // Subscribe to router events to detect changes in the URL
    this.router.events.subscribe(val => {
      this.setModes();
      this.listQuotes();
    });

    // Refresh the quote list when a new quote is added
    this.quoteService.getRefresh().subscribe((value: boolean) => {
      if (value) {
        console.log('Detected change in quotes...');
        this.listQuotes();
      }
    });

    // Subscribe to search term changes
    this.searchService.getSearchTerm().subscribe((value: string) => {
      if (value != this.searchTerm) {
        this.searchTerm = value;
        console.log(`Search term changed to "${this.searchTerm}"`);
      }
    }
    );
  }

  setModes() {
    this.searchMode = this.route.snapshot.paramMap.has('keyword');
    this.filterMode = this.route.snapshot.paramMap.has('id');
    this.nullSourceMode = this.route.snapshot.paramMap.has('sourceIsNull');  
  }

  listQuotes() {

    console.log(`Getting quotes with pageNumber=${this.pageNumber}, pageSize=${this.pageSize}`)

    if (this.searchMode) {
      this.keyWord = this.route.snapshot.paramMap.get('keyword') ?? '';
      console.log(`Search mode activated with keyword=${this.keyWord}`);
      this.handleSearchQuotes(this.keyWord);
    }
    else if (this.filterMode) {
      this.sourceId = Number(this.route.snapshot.paramMap.get('id'));
      console.log(`Filter mode activated with sourceId=${this.sourceId}`);
      this.handleFilterQuotes(this.sourceId);
    }
    else if (this.nullSourceMode) {
      console.log('Null source mode activated');
      this.handleQuotesWithNullSource();
    }
    else {
      console.log('All quotes mode activated');
      this.handleAllQuotes();
    }
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

  handleQuotesWithNullSource() {
    console.log('Querying quotes with null source...');
    this.quoteService.getPageableQuotesWithNullSource(this.pageNumber - 1, this.pageSize).subscribe(
      this.processResult()
    );
  }

  handleAllQuotes() {
    console.log('Querying all quotes...');
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
    console.log(`Deleting quote with id=${quoteId}...`);
    this.quoteService.deleteQuote(quoteId).subscribe(
      response => {
        console.log(`Deletee quote with id=${quoteId} response=${response.text}`);
        this.listQuotes();
        this.sourceService.refreshSources();
      }
    );
  }

  editQuote(quoteId: number) {
    console.log(`Updating quote to edit with id=${quoteId}...`);
    this.quoteToEditId = quoteId;
    
  }

  updateQuote(quoteId: number) {

    // Retrieve values from inputs edit-quote-input and edit-source-input
    let quoteText = (<HTMLInputElement>document.getElementById('edit-quote-input')).value;
    let sourceName = (<HTMLInputElement>document.getElementById('edit-source-input')).value;

    // If the user didn't enter a value for quoteText, use the original quoteText, find it in the quotes array
    if (quoteText == '')
      quoteText = this.quotes.find(q => q.id == quoteId)?.text ?? '';

    // If the user didn't enter a value for sourceName, use the original sourceName, find it in the quotes array
    if (sourceName == '')
      sourceName = this.quotes.find(q => q.id == quoteId)?.source?.name ?? '';

    console.log(`Updating quote with id=${quoteId} with quoteText=${quoteText} and sourceName=${sourceName}...`);
    this.quoteService.updateQuote(quoteId, quoteText, sourceName).subscribe(
      response => {
        console.log(`Updated quote with id=${quoteId} response=${response.text}`);
        this.quoteToEditId = 0;
        this.listQuotes();
        this.sourceService.refreshSources();
      }
    );

    // Clear the quoteToEditId
  }

  onSort($event: Event) {
    throw new Error('Method not implemented.');
  } 

}

