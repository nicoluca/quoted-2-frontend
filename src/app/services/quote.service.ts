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

  getPageableQuotes(pageNumber: number, pageSize: number): Observable<GetResponseQuotes> {
    const quoteUrl = `${this.url}?page=${pageNumber}&size=${pageSize}`;
    return this.httpClient.get<GetResponseQuotes>(quoteUrl);
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
