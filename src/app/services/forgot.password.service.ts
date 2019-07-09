import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ForgotPasswordService {

  constructor(private http: HttpClient) {}

  submitForgotPassword(email){
    return this.http.post<any>('https://tradesim.xyz/forgotPassword', {
      email: email,
    });
  }

  setPassword(token,password){
    return this.http.post<any>('https://tradesim.xyz/setPassword', {
      uuid: token,
      password: password
    });
  }
}
