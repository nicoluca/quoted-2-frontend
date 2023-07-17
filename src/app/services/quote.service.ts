import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Quote } from '../domain/quote';

@Injectable({
  providedIn: 'root'
})
export class QuoteService {

  private url: string = 'http://localhost:8080/api/quotes'
  private urlSortSuffix: string = '?sort=datetimeCreated,desc';

  private refresh: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private httpClient: HttpClient) { }

  getPageableQuotes(page: number, pageSize: number): Observable<GetResponseQuotes> {
    const quoteUrl = `${this.url}${this.urlSortSuffix}&page=${page}&size=${pageSize}`;
    return this.httpClient.get<GetResponseQuotes>(quoteUrl);
  }

  searchPageableQuotes(keyword: string, page: number, pageSize: number) {
    const quoteUrl = `${this.url}/search/findByTextContainingIgnoreCaseOrSourceNameContainingIgnoreCase${this.urlSortSuffix}&text=${keyword}&page=${page}&size=${pageSize}`;
    return this.httpClient.get<GetResponseQuotes>(quoteUrl);
  }

  filterPageableQuotes(sourceId: number, arg1: number, pageSize: number): Observable<GetResponseQuotes> {
    const quoteUrl = `${this.url}/search/findBySourceId${this.urlSortSuffix}&id=${sourceId}&page=${arg1}&size=${pageSize}`;
    return this.httpClient.get<GetResponseQuotes>(quoteUrl);
  }

  deleteQuote(quoteId: number): Observable<Quote> {
    const quoteUrl = `http://localhost:8080/api/update-quote/${quoteId}`; // TODO config instead of hard-coded URL
    return this.httpClient.delete<Quote>(quoteUrl);
  }

  addQuote(text: string): Observable<Quote> {
    const quoteUrl = `${this.url}`;
    return this.httpClient.post<Quote>(quoteUrl, { text });
  }

  getPageableQuotesWithNullSource(page: number, pageSize: number): Observable<GetResponseQuotes> {
    const quoteUrl = `${this.url}/search/findBySourceIsNull?${this.urlSortSuffix}&page=${page}&size=${pageSize}`;
    return this.httpClient.get<GetResponseQuotes>(quoteUrl);
  }

  updateQuote(quoteId: number, quoteText: string, sourceName: string): Observable<Quote> {
    const quoteUrl = `http://localhost:8080/api/update-quote/${quoteId}`; // TODO config instead of hard-coded URL
    return this.httpClient.patch<Quote>(quoteUrl, { text: quoteText, source: { name: sourceName } });
  }
  
  refreshQuotes() {
    this.refresh.next(true);
  }

  getRefresh(): Observable<boolean> {
    return this.refresh.asObservable();
  }
  
}

interface GetResponseQuotes {
  _embedded: {
    quotes: Quote[];
  },
  page: {
    size: number,
    totalElements: number,
    totalPages: number,
    number: number
  }
}
