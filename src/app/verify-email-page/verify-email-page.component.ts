import {Component, OnInit} from '@angular/core';
import { WindowRef } from '../services/window.service';
import { Router, ActivatedRoute } from '@angular/router';
import {VerificationService} from '../services/verification.service';
import {GrowlService} from '../services/growl.service';

declare var $: any;
// import { RegisterService } from '../services/register.service';
// declare var grecaptcha: any;


@Component({
  selector: 'app-verify-password-page',
  templateUrl: './verify-email-page.component.html',
  styleUrls: ['./verify-email-page.component.css']
})
export class VerifyEmailPageComponent implements OnInit {

  email = '';

  constructor(
    private window: WindowRef,
    private route: ActivatedRoute,
    private router: Router,
    private verificationService: VerificationService,
    private growlService: GrowlService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const token = params.get('token');
      console.log('token', token);

      this.verificationService.verify(token).subscribe((data) => {
        if(data.msg == 'Success!') {
          this.growlService.addSingle({
            type: 'success',
            header: '',
            message: 'You have successfully verified your email.',
            timeout: 5000
          });
          this.growlService.addSingle({
            type: 'success',
            header: '',
            message: 'Please wait while we redirect you to login...',
            timeout: 5000
          });
          setTimeout(() => {
            this.router.navigateByUrl('/login');
            setTimeout(()=>{
              this.growlService.addSingle({
                type: 'success',
                header: '',
                message: 'You can now go ahead and login. ',
                timeout: 5000
              });
            },300);

          },5000);
        } else {
          this.growlService.addSingle({
            type: 'danger',
            header: 'Failed!',
            message: 'Either this email has already been verified or the token has expired!',
            timeout: 3000
          });
        }
      });

    });
  }


}
