import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Quote } from '../domain/quote';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class QuoteService {

  private url: string = 'http://localhost:8080/api/quotes'

  constructor(private httpClient: HttpClient) { }

  getPageableQuotes(page: number, pageSize: number): Observable<GetResponseQuotes> {
    const quoteUrl = `${this.url}?page=${page}&size=${pageSize}`;
    return this.httpClient.get<GetResponseQuotes>(quoteUrl);
  }

  searchPageableQuotes(keyword: string, page: number, pageSize: number) {
    const quoteUrl = `${this.url}/search/findByTextContainingIgnoreCase?text=${keyword}&page=${page}&size=${pageSize}`;
    return this.httpClient.get<GetResponseQuotes>(quoteUrl);
  }

  filterPageableQuotes(sourceId: number, arg1: number, pageSize: number): Observable<GetResponseQuotes> {
    const quoteUrl = `${this.url}/search/findBySourceId?id=${sourceId}&page=${arg1}&size=${pageSize}`;
    return this.httpClient.get<GetResponseQuotes>(quoteUrl);
  }

  deleteQuote(quoteId: number): Observable<Quote> {
    const quoteUrl = `${this.url}/${quoteId}`;
    return this.httpClient.delete<Quote>(quoteUrl);
  }

  addQuote(text: string): Observable<Quote> {
    const quoteUrl = `${this.url}`;
    return this.httpClient.post<Quote>(quoteUrl, { text });
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
