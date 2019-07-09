import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {constants} from './constants';

@Injectable()
export class VerificationService {

  constructor(private http: HttpClient) {}

  verify(token) {
    const url = constants.baseUrl + '/api/verify-email';
    return this.http.post<any>(url, {
      token: token
    });
  }

}
