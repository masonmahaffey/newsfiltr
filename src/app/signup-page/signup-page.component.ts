import {Component, OnInit} from '@angular/core';
import {WindowRef} from '../services/window.service';
import {RegisterService} from '../services/register.service';
import {GrowlService} from '../services/growl.service';
import {Router} from '@angular/router';

declare var $: any;
// import { RegisterService } from '../services/register.service';
// declare var grecaptcha: any;


@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.css']
})
export class SignupPageComponent implements OnInit {

  displayname = '';
  email = '';
  password = '';
  confirmpassword = '';
  termsofuse = false;
  submittedSignup = false;
  windowReference: any;

  constructor(
    private registerService: RegisterService,
    private growlService: GrowlService,
    private router: Router,
    private windowRef: WindowRef) {}

  ngOnInit() {
    this.windowReference = this.windowRef.nativeWindow();

    setTimeout(() => {
      this.windowReference.grecaptcha.render('signup_recaptcha', {
        'sitekey' : '6Letii0UAAAAABa-VxdSpoc4g8DP9b0koBY8OWXg'
      });
    },1000);

    this.checkTermsOfUse();
  }

  checkTermsOfUse() {
    this.termsofuse = !this.termsofuse;
  }

  signup() {

    const recaptcha = this.windowReference.grecaptcha.getResponse() || null;


    console.log(this.displayname);

    var goodToGo = true;

    if(!recaptcha) {
      goodToGo = false;
      this.growlService.addSingle({
        type: 'danger',
        header: '',
        message: 'You must solve the captcha.'
      });
    }


    if (this.displayname.length < 4) {
      goodToGo = false;
      this.growlService.addSingle({
        type: 'danger',
        header: '',
        message: 'Your display name is too short.'
      });
    }
    if (this.email.length < 4) {
      goodToGo = false;
      this.growlService.addSingle({
        type: 'danger',
        header: '',
        message: 'Your email is too short.'
      });
    }
    if (this.password.length < 4) {
      goodToGo = false;
      this.growlService.addSingle({
        type: 'danger',
        header: '',
        message: 'Your password is too short.'
      });
    }
    if (this.password != this.confirmpassword) {
      goodToGo = false;
      this.growlService.addSingle({
        type: 'danger',
        header: '',
        message: 'Your passwords do not match.'
      });
    }

    if(this.termsofuse) {
      goodToGo = false;
      console.log('termsofuse', this.termsofuse);
      this.growlService.addSingle({
        type: 'danger',
        header: '',
        message: 'You must first agree to the terms of use.'
      });
    }

    if(this.submittedSignup) {
      this.growlService.addSingle({
        type: 'danger',
        header: '',
        message: "You've already signed up!"
      });
    }

    if (goodToGo && !this.submittedSignup) {
      this.submittedSignup = true;
      this.registerService.register(
        this.displayname,
        this.email,
        this.password,
        recaptcha).subscribe((data: any) => {
        console.log('rs', data);
        if (data.msg == 'Success!') {
          this.growlService.addSingle({
            type: 'success',
            header: 'Success!',
            message: 'Please go verify your email.',
            timeout: 6000
          });
        }
        if (data.msg == 'User already exists!') {
          this.growlService.addSingle({
            type: 'danger',
            header: 'Failed!',
            message: 'User already exists.'
          });
        }
      });
    }
  }

}
