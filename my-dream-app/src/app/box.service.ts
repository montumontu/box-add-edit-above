import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import {Box} from './box.model';

@Injectable({
  providedIn: 'root'
})
export class BoxService {
  readonly ROOT_URL = 'http://localhost:3000';

  constructor(private _http: HttpClient) { }

  getBoxes(): Observable<Box[]> {
    return this._http.get<Box[]>(this.ROOT_URL + '/box');
  }

  postBoxes(box) {
      return new Promise((res, rej) => {
      const body = JSON.stringify(box);
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'my-auth-token'
        })
      };
      return this._http.post<Box>(this.ROOT_URL + '/box', body, httpOptions).subscribe(
        (data: any) => {
          console.log(data);
          res(data);
        }
      );
    });
  }

  updateBoxes(box) {
    return new Promise((res, rej) => {
      const body = JSON.stringify(box);
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'my-auth-token'
        })
      };
      return this._http.patch<Box>(this.ROOT_URL + '/box', body, httpOptions).subscribe(
        (data: any) => {
          console.log(data);
          res(data);
        }
      );
    });
  }
  deleteBoxes(boxId) {
      return new Promise((res, rej) => {
      console.log(boxId, 'check');
      const body = JSON.stringify(boxId);
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'my-auth-token'
        })
      };
      return this._http.delete(this.ROOT_URL + '/box/' + boxId).subscribe(
        (data: any) => {
          console.log(data);
          console.log('In service deleted');
          res(data);
        };
    });
  }
}
