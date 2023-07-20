import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userId: string = '';
  storage: Storage = sessionStorage;
  email: string = '';

  url: string = 'http://localhost:8080/api/users/uuid';

  private refresh: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private httpClient: HttpClient) { }

  getUUID(email: string): Observable<GetResponseUUID> {
    const uuidUrl = `${this.url}?email=${email}`;
    return this.httpClient.get<GetResponseUUID>(uuidUrl);
  }

  refreshUUID() {
    this.refresh.next(true);
  }

  getRefresh(): Observable<boolean> {
    return this.refresh.asObservable();
  }

}

interface GetResponseUUID {
  uuid: string;
}
