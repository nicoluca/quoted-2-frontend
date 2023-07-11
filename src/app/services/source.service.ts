import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Source } from '../domain/source';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SourceService {

  private url: string = 'http://localhost:8080/api/sources'

  private refresh: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private httpClient: HttpClient) { }

  getPageableSources(page: number, pageSize: number): Observable<GetResponseSources> {
    const sourceUrl = `${this.url}?page=${page - 1}&size=${pageSize}`;
    return this.httpClient.get<GetResponseSources>(sourceUrl);
  }

  refreshSources() {
    this.refresh.next(true);
  }

  getRefresh(): Observable<boolean> {
    return this.refresh.asObservable();
  }

}

interface GetResponseSources {
  _embedded: {
    sources: Source[];
  },
  page: {
    size: number,
    totalElements: number,
    totalPages: number,
    number: number
  }
}
