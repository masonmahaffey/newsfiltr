import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { constants } from './constants';

@Injectable()
export class LoginService {
  constructor(private http: HttpClient) {}

  login(email, password) {
    return this.http.post<any>(constants.baseUrl + '/api/login', {
      email: email,
      password: password
    });
  }
}
