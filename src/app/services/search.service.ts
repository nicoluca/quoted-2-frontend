import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private _searchTerm: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor() { }

  setSearchTerm(searchTerm: string) {
    this._searchTerm.next(searchTerm);
  }

  getSearchTerm(): Observable<string> {
    return this._searchTerm.asObservable();
  }
}
