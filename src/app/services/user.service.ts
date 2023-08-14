import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService implements OnInit{

  private _url: string = environment.user_url;


  constructor(private _httpClient: HttpClient) { }

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  saveUser(): Observable<GetResponseUser> {
    const userUrl = `${this._url}`;
    return this._httpClient.get<GetResponseUser>(userUrl);
  }

  getSecretNumber(): Observable<GetResponseSecret> {
    const quoteUrl = `${this._url}/get-secret`;
    return this._httpClient.get<GetResponseSecret>(quoteUrl);
  }

}

interface GetResponseUser {
  email: string;
}

interface GetResponseSecret {
  secret: number;
}
