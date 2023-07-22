import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Source } from '../domain/source';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SourceService {

  private _url: string = environment.source_url;

  private _refresh: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private _httpClient: HttpClient) { }

  
  getPageableSources(page: number, pageSize: number): Observable<GetResponseSources> {
    let params = new HttpParams();
    params = params.append('page', page.toString());
    params = params.append('size', pageSize.toString());

    const sourceUrl = `${this._url}`;
    return this._httpClient.get<GetResponseSources>(sourceUrl, { params });
  }

  refreshSources() {
    this._refresh.next(true);
  }

  getRefresh(): Observable<boolean> {
    return this._refresh.asObservable();
  }

}

interface GetResponseSources {
  content: {
    sources: Source[];
  },
  size: number,
  totalPage: number,
  totalElements: number,
  number: number
}
