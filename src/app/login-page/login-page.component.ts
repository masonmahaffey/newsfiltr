import {Component, OnInit} from '@angular/core';
import {WindowRef} from '../services/window.service';
import {GrowlService} from '../services/growl.service';
import {LoginService} from '../services/login.service';
import {constants} from '../services/constants';
import {Router} from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  email = '';
  password = '';

  constructor(
    private window: WindowRef,
    private growlService: GrowlService,
    private loginService: LoginService,
    private router: Router
  ) {}

  ngOnInit() {


  }

  login() {
    var goodToGo = true;
    if(this.email.length < 5) {
      goodToGo = false;
      this.growlService.addSingle({
        type: 'warning',
        header: 'Failed!',
        message: 'Your email is not long enough!'
      });
    }
    if(this.password.length < 5) {
      goodToGo = false;
      this.growlService.addSingle({
        type: 'warning',
        header: 'Failed!',
        message: 'Your password is not long enough!'
      });
    }

    if(goodToGo) {
      this.loginService.login(this.email, this.password).subscribe(data => {
        if(data.token) {
          localStorage.setItem(constants.tokenCode, data.token);
          this.router.navigateByUrl('/');
          setTimeout(()=>{
            this.growlService.addSingle({
              type: 'success',
              header: '',
              message: 'You are logged in.'
            });
          },1200);
        } else {
          this.growlService.addSingle({
            type: 'warning',
            header: 'Failed!',
            message: "Email/Password incorrect or make sure you've verified your email!"
          });
        }
      })
    }

  }
}
