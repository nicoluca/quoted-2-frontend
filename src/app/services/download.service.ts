import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DownloadService {

  private _url: string = environment.download_url;

  constructor(private httpClient: HttpClient) { }

  downloadZip(): Observable<any> {

    const httpOptions = {
      responseType: 'blob' as 'json'
    };

    console.log('Sending download request to: ', this._url);
  
    return this.httpClient.get(this._url, httpOptions);
  }
}
