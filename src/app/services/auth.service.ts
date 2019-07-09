import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import {constants} from './constants';

@Injectable()
export class AuthService {

  public loggedin = false;
  public user = null;
  public scrollposition = 0;
  public goto = '';

  constructor(private http: HttpClient) {}

  authenticate(): Observable<any> {
    const token = localStorage.getItem(constants.tokenCode);
    const url = constants.baseUrl + '/api/authenticate';
    return this.http.post<any>(url, {
      token: token,
    });
  }
}
