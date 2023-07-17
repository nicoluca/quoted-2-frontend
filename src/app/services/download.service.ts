import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DownloadService {

  private url: string = 'http://localhost:8080/api/download-quotes';

  constructor(private httpClient: HttpClient) { }

  downloadZip(): Observable<any> {

    const httpOptions = {
      responseType: 'blob' as 'json'
    };
  
    return this.httpClient.get(this.url, httpOptions);
  }
}
