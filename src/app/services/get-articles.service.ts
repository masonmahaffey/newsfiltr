import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { constants } from './constants';

@Injectable()
export class GetArticlesService {
  constructor(private http: HttpClient) {}

  getTopHeadlines() {
    if(localStorage.getItem(constants.tokenCode)) {
      return this.http.get<any>(constants.baseUrl + '/api/top-headlines?token=' + localStorage.getItem(constants.tokenCode));
    } else {
      return this.http.get<any>(constants.baseUrl + '/api/top-headlines');
    }
  }
}
