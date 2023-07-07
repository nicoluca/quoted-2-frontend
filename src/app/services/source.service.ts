import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Source } from '../domain/source';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SourceService {

  private url: string = 'http://localhost:8080/api/sources'

  constructor(private httpClient: HttpClient) { }

  getPageableSources(page: number, pageSize: number): Observable<GetResponseSources> {
    const sourceUrl = `${this.url}?page=${page - 1}&size=${pageSize}`;
    return this.httpClient.get<GetResponseSources>(sourceUrl);
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
