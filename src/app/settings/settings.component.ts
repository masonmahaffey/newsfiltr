import {Component, OnInit} from '@angular/core';
import { WindowRef } from '../services/window.service';
import {GetArticlesService} from '../services/get-articles.service';
import {HttpClient} from '@angular/common/http';
import {constants} from '../services/constants';
import {GrowlService} from '../services/growl.service';

declare var $: any;
// import { RegisterService } from '../services/register.service';
// declare var grecaptcha: any;


@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  articles = [];

  sensationalismRating = 5;
  biasRating = 5;
  accuracyRating = 5;
  overallRating = 5;

  newpassword = '';
  confirmnewpassword = '';
  currentpassword = '';

  sentrequest = false;


  constructor(
    private window: WindowRef,
    private getArticlesService: GetArticlesService,
    private http: HttpClient,
    private growl: GrowlService
  ) {
    this.getArticlesService.getTopHeadlines().subscribe(articles => {
      console.log(articles);
      this.articles = articles;
    });
  }

  ngOnInit() {}

  submitNewPassword() {

    this.sentrequest = true;
    var flag = true;
    const acceptablePasswordLength = 2;

    if (this.newpassword.length < acceptablePasswordLength) {
      flag = false;
      this.growl.addSingle({
        type: 'danger',
        header: '',
        message: 'Password must be at least 6 characters long.'
      });
    }
    if (this.confirmnewpassword.length < acceptablePasswordLength) {
      flag = false;
      this.growl.addSingle({
        type: 'danger',
        header: '',
        message: 'Confirm Password must be at least 6 characters long.'
      });
    }
    if (this.currentpassword.length < acceptablePasswordLength) {
      flag = false;
      this.growl.addSingle({
        type: 'danger',
        header: '',
        message: 'Current password must be at least 6 characters long.'
      });
    }

    if (this.confirmnewpassword != this.newpassword) {
      flag = false;
      this.growl.addSingle({
        type: 'danger',
        header: '',
        message: 'Passwords do not match.'
      });
    }

    if (flag && !this.sentrequest) {
      this.http.post(constants.baseUrl + '/api-pr/change-password', {
        token: localStorage.getItem(constants.tokenCode),
        password: this.newpassword,
        currentpassword: this.currentpassword
      }).subscribe((data: any) => {
        console.log('data', data);

        if(data.msg == 'Successfully changed password!') {
          this.growl.addSingle({
            type: 'success',
            header: '',
            message: 'Your password has been changed!'
          });
        }
        if(data.msg == 'bad password') {
          this.growl.addSingle({
            type: 'danger',
            header: '',
            message: 'That is not your current password!'
          });
        }
        this.sentrequest = false;
      });
    }


  }

  cancelSubscription() {
    this.http.post(constants.baseUrl + '/api-pr/cancel-subscription', {
      token: localStorage.getItem(constants.tokenCode)
    }).subscribe((data: any) => {
      console.log('data', data);

      if(data.msg == 'Successfully canceled subscription!') {
        this.growl.addSingle({
          type: 'success',
          header: '',
          message: 'Your subscription has been canceled and will not be renewed.',
          timeout: 5000
        });

        setTimeout(()=>{
          this.growl.addSingle({
            type: 'success',
            header: '',
            message: 'However, you will still have access to all features until the end of the subscription period.',
            timeout: 5000
          });
        },5000);
      } else {
        this.growl.addSingle({
          type: 'danger',
          header: '',
          message: 'Failed to cancel subscription, please try again later.'
        });
      }


      this.sentrequest = false;
    });
  }
}
