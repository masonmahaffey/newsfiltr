import {Component, OnInit} from '@angular/core';
import { WindowRef } from '../services/window.service';
import {GetArticlesService} from '../services/get-articles.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {constants} from '../services/constants';
import {AuthService} from '../services/auth.service';
import {GrowlService} from '../services/growl.service';
import {ActivatedRoute, Router} from '@angular/router';

declare var $: any;
// import { RegisterService } from '../services/register.service';
// declare var grecaptcha: any;


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css', '../view-article/view-article.component.css']
})
export class ProfileComponent implements OnInit {

  articles = [];

  sensationalismRating = 5;
  accuracyRating = 5;
  biasRating = 5;
  overallRating = 50;

  showMoreReviews = [];

  user: any = {};
  loading = true;

  tagline = '';
  displayname = '';
  description = '';

  selectedReview = {
    title: '',
    unique: '',
    body: ''
  };

  descriptionExpanded = false;

  token = '';

  auth = 0;

  following = false;
  istheuser = false;

  constructor(
    private window: WindowRef,
    private getArticlesService: GetArticlesService,
    private http: HttpClient,
    private authService: AuthService,
    private growlService: GrowlService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.user.reviews = [];
    this.user.reviews.push({title: 'so what'});
    this.toggleDescriptionExpand();
  }

  ngOnInit() {
    $('#editor2').summernote({
      height: 300,
      placeholder: 'Write your self description here...'
    });
    $('#editor3').summernote({
      height: 300,
      placeholder: 'Write your ass description here...'
    });
    $('.article-bias-rating-popover').popover({
      container: '.bias-popover-anchor'
    });

    $('.article-accuracy-rating-popover').popover({
      container: '.accuracy-popover-anchor'
    });

    $('.example-popover').popover({
      container: '.sensationalism-popover'
    });

    //Bootstrap Slider
    $('.bslider').bootstrapSlider();

    $('.be-left-sidebar').click(function(){
      $('.left-sidebar-toggle').toggleClass('open');
      $('.left-sidebar-spacer').toggleClass('open');
    });

    this.authService.authenticate().subscribe(data => {
      this.loading = false;

      if (data.msg == 'Success!') {
        this.authService.user = data.data;
        this.auth = 1;
      } else {
        this.auth = 0;
      }
    });


    this.route.paramMap.subscribe((params:any) => {
      const token = params.get('token');
      console.log('token', token);

      this.token = token;
      this.getProfile();
    })
  }

  followUser() {
    this.http.post(constants.baseUrl + '/api-pr/follow-user', {
      token: localStorage.getItem(constants.tokenCode),
      user_unique: this.token
    }).subscribe((data)=> {
      this.following = true;
    });
  }

  unfollowUser() {
    this.following = false;
    this.http.post(constants.baseUrl + '/api-pr/unfollow-user', {
      token: localStorage.getItem(constants.tokenCode),
      user_unique: this.token
    }).subscribe((data)=> {});
  }

  getProfile() {
    this.http.post(constants.baseUrl + '/api/get-user',{
      user_unique: this.token
    }).subscribe((data: any) => {
      if (data.msg == 'Success!') {

        if(this.authService.user) {
          if(this.authService.user.following.includes(this.token)) {
            this.following = true;
          }

          if(this.token == this.authService.user.user_unique) {
            this.istheuser = true;
          }
        }


        data.data.reviews.sort(function(a: any, b: any) {
          if (a.time < b.time)
            return 1;
          if (a.time > b.time)
            return -1;
          return 0;
        });

        this.user = data.data;
        this.displayname = this.user.displayname;
        this.description = this.user.description;
        if(this.user.description.length > 0) {
          $('#editor2').summernote('code', this.user.description);
        }
        this.tagline = this.user.tagline;
        this.loading = false;
        console.log('this.user', this.user);
      }
    });
  }

  toggleAccuracy() {
    const accuracy = $('.accuracy-rating').attr('value');
    this.accuracyRating = parseInt(accuracy);
    this.toggleOverallRating();
  }

  toggleBias() {
    const bias = $('.bias-rating').attr('value');
    this.biasRating = parseInt(bias);
    this.toggleOverallRating();
  }

  toggleSensationalism() {
    const sensationalism = $('.sensationalism-rating').attr('value');
    this.sensationalismRating = parseInt(sensationalism);
    this.toggleOverallRating();
  }

  toggleOverallRating() {
    const sens = this.sensationalismRating;
    const acc = this.accuracyRating;
    const bias = this.biasRating;
    var score = (acc * 10) - (sens * 2) - (bias * 8);
    if(score < 0) {
      score = 0;
    }
    this.overallRating = score;
  }

  clipReviewBody(body) {
    body = body.replace(/(<([^>]+)>)/ig,"");
    body = body.replace("&nbsp;","")
    var split = body.split(" ");
    var clipping = split.slice(0, 20);
    clipping = clipping.join(" ");

    return clipping;
  }

  goToAccount() {
    this.authService.goto = 'account';
    this.router.navigateByUrl('/');
  }

  goToSettings() {
    this.authService.goto = 'settings';
    this.router.navigateByUrl('/');
  }

  logout() {
    this.auth = 0;
    localStorage.setItem(constants.tokenCode, '');
    this.growlService.addSingle({
      type: 'success',
      header: '',
      message: 'You are logged out.'
    });
  }


  toggleDescriptionExpand() {
    this.descriptionExpanded = !this.descriptionExpanded;
  }

  submitEdit() {

  }

  showError(message){
    this.growlService.addSingle({
      type: 'danger',
      header: '',
      message: message
    });
  }

  showSuccess(message){
    this.growlService.addSingle({
      type: 'success',
      header: '',
      message: message
    });
  }

  selectReview(review) {
    $('#editor3').summernote('code', review.body);
    this.selectedReview = review;
    console.log(review);
  }

  submitReviewEdit() {
    var goodtogo = true;
    this.selectedReview.body = $('#editor3').summernote('code');

    if($('#editor3').summernote('code').length < 200) {
      goodtogo = false;
      this.growlService.addSingle({
        type: 'danger',
        header: '',
        message: 'Your review must be at least 200 characters long.'
      });
    }

    if(this.selectedReview.title.length < 7) {
      goodtogo = false;
      this.growlService.addSingle({
        type: 'danger',
        header: '',
        message: 'The title of your review must be greater than 7 characters long and less than 60.'
      });
    }

    if(this.selectedReview.title.length > 60) {
      goodtogo = false;
      this.growlService.addSingle({
        type: 'danger',
        header: '',
        message: 'The title of your review must be less than 30 characters long.'
      });
    }


    if(goodtogo) {

      console.log('selected review', this.selectedReview);

      this.http.post(constants.baseUrl + '/api-pr/edit-review', {
        token: localStorage.getItem(constants.tokenCode),
        id: this.selectedReview.unique,
        title: this.selectedReview.title,
        body: $('#editor3').summernote('code'),
        sensationalism: this.sensationalismRating,
        accuracy: this.accuracyRating,
        bias: this.biasRating
      }).subscribe((data:any) => {

        if(data.msg == 'Successfully edited review!') {
          this.showSuccess('Successfully edited the review!');
        } else {
          this.showError('Failed to edit the review. You may be experiencing connectivity issues...');
        }
      });
    }
  }




  showMore(id) {
    this.showMoreReviews.push(id);
  }

  hideMore(id) {
    this.showMoreReviews.splice(this.showMoreReviews.indexOf(id), 1);
  }
}
