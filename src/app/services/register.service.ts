import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {constants} from './constants';

@Injectable()
export class RegisterService {

  constructor(private http: HttpClient) {}

  register(displayname, email, password, captcha = null) {
    return this.http.post<any>(constants.baseUrl + '/api/register', {
      displayname: displayname,
      email: email,
      password: password,
      captcha: captcha
    });
  }

}
