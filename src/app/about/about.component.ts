import {Component, OnInit} from '@angular/core';
import { WindowRef } from '../services/window.service';
import {GetArticlesService} from '../services/get-articles.service';

declare var $: any;
// import { RegisterService } from '../services/register.service';
// declare var grecaptcha: any;


@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  articles = [];

  sensationalismRating = 5;
  biasRating = 5;
  accuracyRating = 5;
  overallRating = 5;


  constructor(
    private window: WindowRef,
    private getArticlesService: GetArticlesService
  ) {
    this.getArticlesService.getTopHeadlines().subscribe(articles => {
      console.log(articles);
      this.articles = articles;
    });
  }

  toggleAccuracy() {
    const accuracy = $('.accuracy-rating').attr('value');
    this.accuracyRating = parseInt(accuracy);
    this.toggleOverallRating();
    console.log('acc', accuracy);
  }

  toggleBias() {
    const bias = $('.bias-rating').attr('value');
    this.biasRating = parseInt(bias);
    this.toggleOverallRating();
    console.log('bias', bias);
  }

  toggleSensationalism() {
    const sensationalism = $('.sensationalism-rating').attr('value');
    this.sensationalismRating = parseInt(sensationalism);
    this.toggleOverallRating();
    console.log('sens', sensationalism);
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

  getReviewCode() {
    const review = $('#editor1').summernote('code');
    console.log('review', review);
  }

  ngOnInit() {
    // setTimeout(function(){
    //   $('.write-review').click();
    // },300);
  }
}
