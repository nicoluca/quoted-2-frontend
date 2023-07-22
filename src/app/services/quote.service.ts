import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Quote } from '../domain/quote';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class QuoteService {

  private _url: string = environment.quote_url;
  private _sortParam: string = environment.sort_param;

  storage: Storage = sessionStorage;

  private _refresh: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private httpClient: HttpClient) { }

  getPageableQuotes(page: number, pageSize: number): Observable<GetResponseQuotes> {
    let params = new HttpParams();
    params = params.append('page', page.toString());
    params = params.append('size', pageSize.toString());
    params = params.append('sort', this._sortParam);

    const quoteUrl = `${this._url}`;
    return this.httpClient.get<GetResponseQuotes>(quoteUrl, { params });
  }

  searchPageableQuotes(keyword: string, page: number, pageSize: number) {
    let params = new HttpParams();
    params = params.append('page', page.toString());
    params = params.append('size', pageSize.toString());
    params = params.append('sort', this._sortParam);
    params = params.append('query', keyword);

    const quoteUrl = `${this._url}/findByText`;
    return this.httpClient.get<GetResponseQuotes>(quoteUrl, { params });
  }

  filterPageableQuotes(sourceId: number, page: number, pageSize: number): Observable<GetResponseQuotes> {
    let params = new HttpParams();
    params = params.append('page', page.toString());
    params = params.append('size', pageSize.toString());
    params = params.append('sort', this._sortParam);
    params = params.append('sourceId', sourceId.toString());

    const quoteUrl = `${this._url}/findBySourece`;
    return this.httpClient.get<GetResponseQuotes>(quoteUrl, { params });
  }

  deleteQuote(quoteId: number): Observable<Quote> {
    const quoteUrl = `${this._url}/${quoteId}`;
    return this.httpClient.delete<Quote>(quoteUrl);
  }

  addQuote(text: string): Observable<Quote> {
    const quoteUrl = `${this._url}`;
    return this.httpClient.post<Quote>(quoteUrl, { text });
  }

  getPageableQuotesWithNullSource(page: number, pageSize: number): Observable<GetResponseQuotes> {
    let params = new HttpParams();
    params = params.append('page', page.toString());
    params = params.append('size', pageSize.toString());
    params = params.append('sort', this._sortParam);

    const quoteUrl = `${this._url}/findBySourceIsNull`;
    return this.httpClient.get<GetResponseQuotes>(quoteUrl, { params });
  }

  updateQuote(quoteId: number, quoteText: string, sourceName: string): Observable<Quote> {
    const quoteUrl = `${this._url}/${quoteId}`;
    return this.httpClient.patch<Quote>(quoteUrl, { text: quoteText, source: { name: sourceName } });
  }
  
  refreshQuotes() {
    this._refresh.next(true);
  }

  getRefresh(): Observable<boolean> {
    return this._refresh.asObservable();
  }
  
}

interface GetResponseQuotes {
  content: {
    quotes: Quote[];
  },
  size: number,
  totalPage: number,
  totalElements: number,
  number: number
}
