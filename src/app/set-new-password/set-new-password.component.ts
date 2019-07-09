import {Component, OnInit} from '@angular/core';
import { WindowRef } from '../services/window.service';
import { Router, ActivatedRoute } from '@angular/router';
import {GrowlService} from '../services/growl.service';
import {HttpClient} from '@angular/common/http';
import {constants} from '../services/constants';

declare var $: any;
// import { RegisterService } from '../services/register.service';
// declare var grecaptcha: any;


@Component({
  selector: 'app-verify-password-page',
  templateUrl: './set-new-password.component.html',
  styleUrls: ['./set-new-password.component.css']
})
export class SetNewPasswordComponent implements OnInit {

  password = '';
  confirmpassword = '';
  token = '';
  alreadysubmitted = false;

  constructor(
    private window: WindowRef,
    private route: ActivatedRoute,
    private router: Router,
    private growlService: GrowlService,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const token = params.get('token');
      this.token = token;
    });
  }

  submitReset() {
    var flag = true;
    if(this.password != this.confirmpassword) {
      flag = false;

      this.growlService.addSingle({
        type: 'danger',
        header: '',
        message: 'Passwords do not match!'
      });
    }

    if(this.token.length < 4) {
      flag = false;
      this.growlService.addSingle({
        type: 'danger',
        header: '',
        message: 'Bad token!'
      });
    }

    if(this.alreadysubmitted) {
      flag = false;
      this.growlService.addSingle({
        type: 'danger',
        header: '',
        message: 'Already submitted a reset!'
      });
    }


    if(flag) {
      this.http.post(constants.baseUrl + '/api/set-password', {
        forgot_password_token: this.token,
        password: this.password
      }).subscribe(data => {
        this.growlService.addSingle({
          type: 'success',
          header: '',
          message: 'Successfully set new password.'
        });
        this.growlService.addSingle({
          type: 'success',
          header: '',
          message: 'Please wait one moment while we redirect you to the login.'
        });

        setTimeout(()=>{
          this.router.navigateByUrl('/login');
        }, 2200);
      });
      this.alreadysubmitted = true;
    }


  }


}
