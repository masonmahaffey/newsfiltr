import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import {constants} from './constants';

@Injectable()
export class ReviewService {

  constructor(private http: HttpClient) {}

  addReview(id, title, body, sensationalism, accuracy, bias): Observable<any> {
    const token = localStorage.getItem(constants.tokenCode);
    const url = constants.baseUrl + '/api-pr/add-review';
    const payload = {
      token: token,
      id: id,
      title : title,
      body: body,
      sensationalism: sensationalism,
      accuracy: accuracy,
      bias: bias
    };

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };

    console.log("BODY: ", payload);
    return this.http.post<any>(url, payload, httpOptions);
  }
}
