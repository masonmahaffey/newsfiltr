import {Component, OnInit} from '@angular/core';
import { WindowRef } from '../services/window.service';
import {HttpClient} from '@angular/common/http';
import {constants} from '../services/constants';
import {GrowlService} from '../services/growl.service';

declare var $: any;
// import { RegisterService } from '../services/register.service';
// declare var grecaptcha: any;


@Component({
  selector: 'app-forgot-password-page',
  templateUrl: './forgot-password-page.component.html',
  styleUrls: ['./forgot-password-page.component.css']
})
export class ForgotPasswordPageComponent implements OnInit {

  email = '';
  submitted = false;

  constructor(
    private window: WindowRef,
    private http: HttpClient,
    private growlService: GrowlService,
  ) {}

  ngOnInit() {}

  submitForgotPassword() {
    var flag = true;
    if(this.email.length < 3) {
      flag = false;

      this.growlService.addSingle({
        type: 'danger',
        header: '',
        message: 'Please add your email.'
      });
    }

    if(this.submitted) {
      flag = false;

      this.growlService.addSingle({
        type: 'danger',
        header: '',
        message: "You've submitted a password reset."
      });
    }

    if(flag) {
      this.http.post(constants.baseUrl + '/api/forgot-password', {
        "email": this.email
      }).subscribe((data: any) => {
        this.growlService.addSingle({
          type: 'success',
          header: '',
          message: 'A password reset has been sent to your email.'
        });
      });
      this.submitted = true;
    }

  }


}
