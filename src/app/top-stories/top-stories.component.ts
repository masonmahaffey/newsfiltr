import {Component, OnInit} from '@angular/core';
import { WindowRef } from '../services/window.service';
import {GetArticlesService} from '../services/get-articles.service';
import {HttpClient} from '@angular/common/http';
import {constants} from '../services/constants';

declare var $: any;
// import { RegisterService } from '../services/register.service';
// declare var grecaptcha: any;


@Component({
  selector: 'app-top-stories',
  templateUrl: './top-stories.component.html',
  styleUrls: ['../view-article/view-article.component.css', './top-stories.component.css']
})
export class TopStoriesComponent implements OnInit {

  articles = [];

  sensationalismRating = 3;
  biasRating = 3;
  accuracyRating = 3;
  isFakeNews = false;

  selectedVoteArticle = '';
  overallRating = 5;
  isUpvote = true;

  accuracyRatingClicked = false;
  biasRatingClicked = false;
  sensationalismRatingClicked = false;

  popupImage = '';

  lastToggle = 0;


  constructor(
    private window: WindowRef,
    private getArticlesService: GetArticlesService,
    private http: HttpClient
  ) {
    this.getArticlesService.getTopHeadlines().subscribe(articles => {
      console.log(articles);
      articles.forEach(article => {
        article.rating = this.giveRandom();
      });
      this.articles = articles;
    });
  }

  toggleAccuracy() {
    const accuracy = $('.accuracy-rating').attr('value');
    this.accuracyRating = parseInt(accuracy);
    this.toggleOverallRating();
    this.accuracyRatingClicked = true;

    console.log('acc', accuracy);
  }

  toggleBias() {
    const bias = $('.bias-rating').attr('value');
    this.biasRating = parseInt(bias);
    this.toggleOverallRating();
    this.biasRatingClicked = true;

    console.log('bias', bias);
  }

  toggleSensationalism() {
    const sensationalism = $('.sensationalism-rating').attr('value');
    this.sensationalismRating = parseInt(sensationalism);
    this.toggleOverallRating();
    console.log('sens', sensationalism);
    this.sensationalismRatingClicked = true;
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

  giveRandom() {
    function getRandomInt(max) {
      return Math.floor(Math.random() * Math.floor(max));
    }

    return getRandomInt(101);
  }

  calculateLeft(rating) {
    if(rating == 100) {
      return '-11px';
    } else {
      return '-6px';
    }
  }

  calculateFontSize(rating) {
    if(rating == 100) {
      return '18px';
    } else {
      return '20px';
    }
  }

  calculateColor(rating) {
    var hexnum;

    if(rating < 30) {
      hexnum = '00';
    } else{
      rating += 30;

      if(rating > 100) {
        rating = 100;
      }
      hexnum = ((255 / 100) * rating).toString(16);
    }


    if (hexnum.split('.').length > 1) {
      hexnum = hexnum.split('.')[0];
    } else {
      hexnum = hexnum;
    }


    console.log('hexnum', hexnum);
    return '#' + hexnum + '0000';
  }

  ngOnInit() {
    $('.article-bias-rating-popover').popover({
      container: '.bias-popover-anchor'
    });
    $('.article-accuracy-rating-popover').popover({
      container: '.accuracy-popover-anchor'
    });
    $('.example-popover').popover({
      container: '.sensationalism-popover'
    });

    $('.switch-button-yesno').on('click', function() {
      alert('fake news');
    });
  }

  refreshSlider(rating) {
    $('.bslider').bootstrapSlider('destroy');
    $('#accuracy-rating').remove();
    $('#bias-rating').remove();
    $('#sensationalism-rating').remove();

    $('.accuracy-rating-wrap').html('<input id="accuracy-rating" class="bslider form-control accuracy-rating" type="text" data-slider-min="0" data-slider-max="5" data-slider-step="1">');
    $('.bias-rating-wrap').html('<input id="bias-rating" class="bslider form-control bias-rating" type="text" data-slider-min="0" data-slider-max="5" data-slider-step="1">');
    $('.sensationalism-rating-wrap').html('<input id="sensationalism-rating" class="bslider form-control sensationalism-rating" type="text" data-slider-min="0" data-slider-max="5" data-slider-step="1">');

    $('.bslider').bootstrapSlider({id: 'accuracy-rating', value: rating});
    $('.bslider').bootstrapSlider({id: 'bias-rating', value: rating});
    $('.bslider').bootstrapSlider({id: 'sensationalism-rating', value: rating});
  }

  toggleIsFakeNews() {
    if((new Date().getTime() - this.lastToggle) > 200) {
      this.isFakeNews = !this.isFakeNews;

      if (this.isFakeNews) {
        $('#ratings-wrapper-el').addClass('hide-this-el');
      } else {
        $('#ratings-wrapper-el').removeClass('hide-this-el');
      }
    }
    this.lastToggle = new Date().getTime();
  }

  downvote(unique) {
    this.isUpvote = false;
    this.selectedVoteArticle = unique;
    this.accuracyRating = 2;
    this.sensationalismRating = 2;
    this.biasRating = 2;
    this.refreshSlider(2);
  }

  upvote(unique) {
    this.isUpvote = true;
    this.selectedVoteArticle = unique;
    this.accuracyRating = 4; 
    this.sensationalismRating = 4;
    this.biasRating = 4;
    this.refreshSlider(4);
  }

  cancelVote(unique) {
    this.selectedVoteArticle = unique;
    for (var i in this.articles) {
      if (this.articles[i].unique == this.selectedVoteArticle) {
        console.log('THIS RAN');
        var voteAmount = this.articles[i].voteCount;
        if(this.articles[i].uservote.isUpvote) {
          voteAmount = voteAmount - 1;
        } else {
          voteAmount = voteAmount + 1;
        }
        this.articles[i].voteCount = voteAmount;


        const url = constants.baseUrl + '/api-pr/vote';
        const vote = {
          token: localStorage.getItem(constants.tokenCode),
          isUpvote: this.articles[i].uservote.isUpvote,
          sensationalism: this.articles[i].uservote.sensationalism,
          accuracy: this.articles[i].uservote.accuracy,
          bias: this.articles[i].uservote.bias,
          isFakeNews: this.articles[i].uservote.isFakeNews,
          id: this.selectedVoteArticle,
          cancelVote: true
        };
        this.articles[i].uservote = null;
        console.log('vote is here', vote);

        this.http.post(url, vote).subscribe((data: any) => {
          if(data.msg == 'Success!') {}
        });
      }
    }
  }

  submitVote() {
    const url = constants.baseUrl + '/api-pr/vote';

    var vote = {
      token: localStorage.getItem(constants.tokenCode),
      isUpvote: this.isUpvote,
      sensationalism: this.sensationalismRating,
      accuracy: this.accuracyRating,
      bias: this.biasRating,
      isFakeNews: false,
      id: this.selectedVoteArticle,
      cancelVote: false
    };

    for (var i in this.articles) {
      if(this.articles[i].unique == this.selectedVoteArticle) {
        console.log('this.articles[i]', this.articles[i]);

        var voteAmount = 0;
        if(this.articles[i].uservote) {

          if(this.articles[i].uservote.isUpvote == vote.isUpvote) {
            vote.cancelVote = true;
          }

          if(this.articles[i].uservote.isUpvote && !vote.isUpvote) {
            voteAmount = -2;
          }
          else if(!this.articles[i].uservote.isUpvote && vote.isUpvote) {
            voteAmount = 2;
          } else {
            if(vote.isUpvote) {
              voteAmount = 1;
            } else {
              voteAmount = -1;
            }
          }
        } else {
          if(vote.isUpvote) {
            voteAmount = 1;
          } else {
            voteAmount = -1;
          }
        }


        var voteCount = this.articles[i].voteCount;
        voteCount = voteCount + voteAmount;
        this.articles[i].voteCount = voteCount;

        this.articles[i].uservote = vote;
        break;
      }
    }

    this.http.post(url, vote).subscribe((data: any) => {
      if(data.msg == 'Success!') {}
    });
  }

  calculateVoteCountLeft(count) {
    console.log('count', count);
    if(count < 10) {
      return '8px';
    } else if ((count >= 10) && (count < 100)) {
      return '4px';
    } else {
      return '0px';
    }
  }

  setImage(img) {
    this.popupImage = img;
  }
}
