import {Component, OnInit, SecurityContext} from '@angular/core';
import {WindowRef} from '../services/window.service';
import {AuthService} from '../services/auth.service';
import {constants} from '../services/constants';
import {GrowlService} from '../services/growl.service';
import {GetArticlesService} from '../services/get-articles.service';
import {ActivatedRoute} from '@angular/router';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ReviewService} from '../services/review.service';
import {Router} from '@angular/router';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import {SafePipe} from './safe-pipe';

declare var $: any;
declare var document: any;
declare var Chart: any;
declare var tinycolor: any;

// import { RegisterService } from '../services/register.service';
// declare var grecaptcha: any;


@Component({
  selector: 'app-view-article',
  templateUrl: './view-article.component.html',
  styleUrls: ['./view-article.component.css', './view-article.css']
})
export class ViewArticleComponent implements OnInit {

  auth = 2;
  user = {};
  article: any = {};

  sensationalismRating = 3;
  accuracyRating = 3;
  biasRating = 3;
  isFakeNews = false;
  overallRating = 50;
  reviewTitle = '';
  isUpvote = false;

  topStoriesActive = 'active';
  breakingActive = '';
  worldActive = '';
  businessActive = ''
  technologyActive = '';
  sportsActive = '';
  topUsersActive = '';
  electionActive = '';
  sourcesActive = '';
  aboutActive = '';
  settingsActive = '';

  selectedVoteArticle = '';

  showMoreArticles = [];
  token = '';

  popupImage = '';

  trustedUrl: SafeUrl;

  articledesc = '<p class="ui_qtext_para" style="margin-bottom: 1em; padding: 0px; color: rgb(51, 51, 51); font-family: q_serif, Georgia, Times, &quot;Times New Roman&quot;, &quot;Hiragino Kaku Gothic Pro&quot;, Meiryo, serif; font-size: 15px;">First, I&nbsp;<i>really</i>&nbsp;want you to explain this linguistic habit (which I’ve almost exclusively seen in conservative circles) of turning an adjective into a noun. A person is not an illegal immigrant: they’re “an illegal”. A person is not black, they are “a black”. A person’s behavior is not deplorable, they are “a deplorable”. Please, please, please, I’m begging you — why do you do this?</p><p class="ui_qtext_para" style="margin-bottom: 1em; padding: 0px; color: rgb(51, 51, 51); font-family: q_serif, Georgia, Times, &quot;Times New Roman&quot;, &quot;Hiragino Kaku Gothic Pro&quot;, Meiryo, serif; font-size: 15px;">Next, I’m going to do something heretical: I’m going to look at what Hillary Clinton&nbsp;<i>actually&nbsp;</i>said: “<i>You know, to just be grossly generalistic, you could put half of Trump’s supporters into what I call the basket of deplorables. Right? The racist, sexist, homophobic, xenophobic, Islamaphobic — you name it. And unfortunately there are people like that.</i>”</p><p class="ui_qtext_para" style="margin-bottom: 1em; padding: 0px; color: rgb(51, 51, 51); font-family: q_serif, Georgia, Times, &quot;Times New Roman&quot;, &quot;Hiragino Kaku Gothic Pro&quot;, Meiryo, serif; font-size: 15px;">Now, I’m sure that you understand that “half” is not “all”. No one ever said that&nbsp;<i>all&nbsp;</i>of Trump’s supporters are deplorable. But you know, that still leaves the question: why do some people out there think that all Trump’s supporters are “<i>racist, sexist, homophobic, xenophobic, Islamaphobic — you name it”.&nbsp;</i>Why is that?</p><p class="ui_qtext_para" style="margin-bottom: 1em; padding: 0px; color: rgb(51, 51, 51); font-family: q_serif, Georgia, Times, &quot;Times New Roman&quot;, &quot;Hiragino Kaku Gothic Pro&quot;, Meiryo, serif; font-size: 15px;">Because of people who voted for Trump for business reasons.</p>';
  articledesctext = 'First, I really want you to explain this linguistic habit (which I’ve almost exclusively seen in conservative circles) of turning an adjective into a noun. A person is not an illegal immigrant: they’re “an illegal”. A person is not black, they are “a black”. A person’s behavior is not deplorable, they are “a deplorable”. Please, please, please, I’m begging you — why do you do this?';



  constructor(private window: WindowRef,
              private authService: AuthService,
              private growlService: GrowlService,
              private getArticlesService: GetArticlesService,
              private route: ActivatedRoute,
              private http: HttpClient,
              private reviewService: ReviewService,
              private router: Router,
              private sanitizer: DomSanitizer
              ) {}

  ngOnInit() {


    Chart.defaults.global.legend.display = false;


    //Set the chart colors
    var color1 = tinycolor("#ff0000");
    var color2 = "#b00000";
    var color3 = "#000000";

    //Get the canvas element
    var ctx = document.getElementById("polar-chart");

    var data = {
      labels: ["Sensational", "Inaccurate", "Biased"],
      datasets: [
        {
          label: "Ratings",
          backgroundColor: color1.setAlpha(.3).toString(),
          borderColor: color1.toString(),
          pointBackgroundColor: color1.toString(),
          pointBorderColor: "#fff",
          pointHoverBackgroundColor: "#fff",
          pointHoverBorderColor: color1.toString(),
          data: [65, 98, 43]
        }
      ]
    };

    var radar = new Chart(ctx, {
      type: 'radar',
      data: data,
      options: {
        scale: {
          pointLabels: {
            fontSize: 11,
            margin: 14
          }
        },
        legend: {
          labels: {
            marginBottom: '22px'
          }
        }
      }
    });













    // console.log('this.authService.scrollposition', this.authService.scrollposition);

    window.scrollTo(0,0);

    this.route.paramMap.subscribe((params:any) => {
      const token = params.get('token');
      console.log('token', token);

      this.token = token;
      this.getArticle();
    });

    $('.vote-arrows').on('click', function(el) {
      $(el).toggleClass('vote-arrows-clicked');
    })

    if (this.authService.loggedin) {
      console.log('logged in 2');
    } else {
      console.log('not logged in 2');
      this.authService.authenticate().subscribe((data:any) => {
        if (data.msg == 'Success!') {
          this.authService.user = data.data;
          this.auth = 1;
        } else {
          this.auth = 0;
        }
      });
    }

    $('#editor1').summernote({
      height: 300
    });
    $("#editor1").summernote("code", "description here...");



    $('#editorAccuracy').summernote({
      height: 300
    });
    $("#editorAccuracy").summernote("code", "Describe the accuracy or lack thereof.");



    $('#editorBias').summernote({
      height: 300
    });
    $("#editorBias").summernote("code", "Describe the bias or lack thereof.");

    $('#editorSensationalism').summernote({
      height: 300
    });
    $('#editorSensationalism').summernote("code", "Describe the sensationalism or lack thereof.");


  }

  getSanitizedUrl(url): SafeUrl {
    // return this.sanitzer.bypassSecurityTrustResourceUrl(url);
    this.trustedUrl = this.sanitizer.bypassSecurityTrustResourceUrl('https://www.usatoday.com/story/sports/nfl/bills/2018/09/16/vontae-davis-retires-halftime-bills/1329888002/');
    return this.trustedUrl;
  }

  giveRandom() {
    function getRandomInt(max) {
      return Math.floor(Math.random() * Math.floor(max));
    }

    return getRandomInt(101);
  }


  getArticle() {
    const token = localStorage.getItem(constants.tokenCode) || null;

    this.http.post(constants.baseUrl + '/api/get-article', {
      id: this.token,
      token: token
    }).subscribe((res: any) => {
      console.log('URL!!!!!!!!!!!!!!!', res.url);
      // res.url = 'http://localhost:3002/?url=' + res.url;
      res.rating = this.giveRandom();
      res.url = res.url;
      this.article = res;
      if(this.article.reviews.length > 0) {
        this.showMoreArticles.push(this.article.reviews[0]._id);
      }
    });
  }

  navigatePageTo(page) {
    console.log('page', page);


      if(page == 'settingsActive'){
        this.settingsActive = 'active'
        this.topStoriesActive = '';
        this.breakingActive = '';
        this.worldActive = '';
        this.businessActive = ''
        this.technologyActive = '';
        this.sportsActive = '';
        this.topUsersActive = '';
        this.electionActive = '';
        this.sourcesActive = '';
        this.aboutActive = '';
      }

      if(page == 'topStoriesActive'){
        this.settingsActive = '';
        this.topStoriesActive = 'active';
        this.breakingActive = '';
        this.worldActive = '';
        this.businessActive = ''
        this.technologyActive = '';
        this.sportsActive = '';
        this.topUsersActive = '';
        this.electionActive = '';
        this.sourcesActive = '';
        this.aboutActive = '';
      }
      if(page == 'breakingActive') {
        this.settingsActive = '';
        this.topStoriesActive = '';
        this.breakingActive = 'active';
        this.worldActive = '';
        this.businessActive = ''
        this.technologyActive = '';
        this.sportsActive = '';
        this.topUsersActive = '';
        this.electionActive = '';
        this.sourcesActive = '';
        this.aboutActive = '';
      }

      if(page == 'worldActive') {
        this.settingsActive = '';
        this.topStoriesActive = '';
        this.breakingActive = '';
        this.worldActive = 'active';
        this.businessActive = ''
        this.technologyActive = '';
        this.sportsActive = '';
        this.topUsersActive = '';
        this.electionActive = '';
        this.sourcesActive = '';
        this.aboutActive = '';
      }

      if(page == 'businessActive') {
        this.settingsActive = '';
        this.topStoriesActive = '';
        this.breakingActive = '';
        this.worldActive = '';
        this.businessActive = 'active'
        this.technologyActive = '';
        this.sportsActive = '';
        this.topUsersActive = '';
        this.electionActive = '';
        this.sourcesActive = '';
        this.aboutActive = '';
      }

      if(page == 'technologyActive') {
        this.settingsActive = '';
        this.topStoriesActive = '';
        this.breakingActive = '';
        this.worldActive = '';
        this.businessActive = ''
        this.technologyActive = 'active';
        this.sportsActive = '';
        this.topUsersActive = '';
        this.electionActive = '';
        this.sourcesActive = '';
        this.aboutActive = '';
      }


      if(page == 'sportsActive') {
        this.settingsActive = '';
        this.topStoriesActive = '';
        this.breakingActive = '';
        this.worldActive = '';
        this.businessActive = ''
        this.technologyActive = '';
        this.sportsActive = 'active';
        this.topUsersActive = '';
        this.electionActive = '';
        this.sourcesActive = '';
        this.aboutActive = '';
      }

      if(page == 'topUsersActive') {
        this.settingsActive = '';
        this.topStoriesActive = '';
        this.breakingActive = '';
        this.worldActive = '';
        this.businessActive = ''
        this.technologyActive = '';
        this.sportsActive = '';
        this.topUsersActive = 'active';
        this.electionActive = '';
        this.sourcesActive = '';
        this.aboutActive = '';
      }

      if(page == 'electionActive') {
        this.settingsActive = '';
        this.topStoriesActive = '';
        this.breakingActive = '';
        this.worldActive = '';
        this.businessActive = ''
        this.technologyActive = '';
        this.sportsActive = '';
        this.topUsersActive = '';
        this.electionActive = 'active';
        this.sourcesActive = '';
        this.aboutActive = '';
      }

      if(page == 'sourcesActive') {
        this.settingsActive = '';
        this.topStoriesActive = '';
        this.breakingActive = '';
        this.worldActive = '';
        this.businessActive = ''
        this.technologyActive = '';
        this.sportsActive = '';
        this.topUsersActive = '';
        this.electionActive = '';
        this.sourcesActive = 'active';
        this.aboutActive = '';
      }


      if(page == 'aboutActive') {
        this.settingsActive = '';
        this.topStoriesActive = '';
        this.breakingActive = '';
        this.worldActive = '';
        this.businessActive = ''
        this.technologyActive = '';
        this.sportsActive = '';
        this.topUsersActive = '';
        this.electionActive = '';
        this.sourcesActive = '';
        this.aboutActive = 'active';
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

  submitReview() {
    console.log('this.reviewTitle', this.reviewTitle);
    console.log('this.sensationalismRating', this.sensationalismRating);
    console.log('this.accuracyRating', this.accuracyRating);
    console.log('this.biasRating', this.biasRating);
    console.log('review: ', this.getReviewCode());

    var goodtogo = true;

    if(this.getReviewCode().length < 200) {
      goodtogo = false;
      this.growlService.addSingle({
        type: 'danger',
        header: '',
        message: 'Your review must be at least 200 characters long.'
      });
    }

    if(this.reviewTitle.length < 7) {
      goodtogo = false;
      this.growlService.addSingle({
        type: 'danger',
        header: '',
        message: 'The title of your review must be greater than 7 characters long and less than 60.'
      });
    }

    if(this.reviewTitle.length > 60) {
      goodtogo = false;
      this.growlService.addSingle({
        type: 'danger',
        header: '',
        message: 'The title of your review must be less than 30 characters long.'
      });
    }


    if(goodtogo) {
      console.log('TOKEN', localStorage.getItem(constants.tokenCode));

      const headers = {headers: new HttpHeaders().set('Content-Type', 'application/json')};


      const id =  this.article.unique;
      const title = this.reviewTitle;
      const body = this.getReviewCode();
      const sensationalism = this.sensationalismRating;
      const accuracy = this.accuracyRating;
      const bias = this.biasRating;


      this.reviewService.addReview(id, title, body, sensationalism, accuracy, bias).subscribe((data) => {
        if(data.msg == 'Youve already posted a review!') {
          this.growlService.addSingle({
            type: 'danger',
            header: '',
            message: "You've already posted a review for this article! You can edit the review in Profile-->Reviews",
            timeout: 4000
          });
        }
        if(data.msg == 'Successfully added review!') {
          this.growlService.addSingle({
            type: 'success',
            header: '',
            message: 'Successfully added your review!',
            timeout: 4000
          });
          setTimeout(() => {
            this.getArticle();
          },1200);
        }
      });
    }




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

  clipReviewBody(body){
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

  showMore(id) {
    this.showMoreArticles.push(id);
  }

  hideMore(id) {
    this.showMoreArticles.splice(this.showMoreArticles.indexOf(id), 1);
  }

  getReviewCode() {
    const review = $('#editor1').summernote('code');
    return review;
  }

  toggleIsFakeNews() {
    this.isFakeNews = !this.isFakeNews;

    if (this.isFakeNews) {
      $('#ratings-wrapper-el').addClass('hide-this-el');
    } else {
      $('#ratings-wrapper-el').removeClass('hide-this-el');
    }
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

      if (this.article.unique == this.selectedVoteArticle) {
        console.log('THIS RAN');
        var voteAmount = this.article.voteCount;
        if(this.article.uservote.isUpvote) {
          voteAmount = voteAmount - 1;
        } else {
          voteAmount = voteAmount + 1;
        }
        this.article.voteCount = voteAmount;


        const url = constants.baseUrl + '/api-pr/vote';
        const vote = {
          token: localStorage.getItem(constants.tokenCode),
          isUpvote: this.article.uservote.isUpvote,
          sensationalism: this.article.uservote.sensationalism,
          accuracy: this.article.uservote.accuracy,
          bias: this.article.uservote.bias,
          isFakeNews: this.article.uservote.isFakeNews,
          id: this.selectedVoteArticle,
          cancelVote: true
        };
        this.article.uservote = null;
        console.log('vote is here', vote);

        this.http.post(url, vote).subscribe((data: any) => {
          if(data.msg == 'Success!') {}
        });
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

    var voteAmount = 0;
    if(this.article.uservote) {

      if(this.article.uservote.isUpvote == vote.isUpvote) {
        vote.cancelVote = true;
      }

      if(this.article.uservote.isUpvote && !vote.isUpvote) {
        voteAmount = -2;
      }
      else if(!this.article.uservote.isUpvote && vote.isUpvote) {
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


    var voteCount = this.article.voteCount;
    voteCount = voteCount + voteAmount;
    this.article.voteCount = voteCount;

    this.article.uservote = vote;


    this.http.post(url, vote).subscribe((data: any) => {
      if(data.msg == 'Success!') {}
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

  changeVoteCountOfReview(i, vote) {

    if(this.article.reviews[i].uservote) {} else {
      this.article.reviews[i].uservote.vote == 0;
    }

    if(vote == 1) {
      if(this.article.reviews[i].uservote.vote == 0) {
        this.article.reviews[i].voteCount += 1;
      }
      if(this.article.reviews[i].uservote.vote == -1) {
        this.article.reviews[i].voteCount += 2;
      }
    }

    if(vote == 0) {
      if(this.article.reviews[i].uservote.vote == -1) {
        this.article.reviews[i].voteCount += 1;
      }
      if(this.article.reviews[i].uservote.vote == 1) {
        this.article.reviews[i].voteCount -= 1;
      }
    }

    if(vote == -1) {
      if(this.article.reviews[i].uservote.vote == 1) {
        this.article.reviews[i].voteCount -= 2;
      }
      if(this.article.reviews[i].uservote.vote == 0) {
        this.article.reviews[i].voteCount -= 1;
      }
    }

  }

  downvoteReview(review) {
    for(var i in this.article.reviews) {
      if(this.article.reviews[i]._id == review._id) {
        this.changeVoteCountOfReview(i, -1);
        this.article.reviews[i].uservote.vote = -1;
      }
    }

    this.http.post(constants.baseUrl + '/api-pr/review-vote', {
      review_id: review._id,
      token: localStorage.getItem(constants.tokenCode),
      vote: -1
    }).subscribe(data => {});
  }

  cancelvoteReview(review) {
    console.log('review', review);

    for(var i in this.article.reviews) {
      if(this.article.reviews[i]._id == review._id) {
        this.changeVoteCountOfReview(i, 0);
        this.article.reviews[i].uservote.vote = 0;
      }
    }

    this.http.post(constants.baseUrl + '/api-pr/review-vote', {
      review_id: review._id,
      token: localStorage.getItem(constants.tokenCode),
      vote: 0
    }).subscribe(data => {});
  }

  upvoteReview(review) {
    console.log('review', review);

    for(var i in this.article.reviews) {
      if(this.article.reviews[i]._id == review._id) {
        this.changeVoteCountOfReview(i, 1);
        this.article.reviews[i].uservote.vote = 1;
      }
    }

    this.http.post(constants.baseUrl + '/api-pr/review-vote', {
      review_id: review._id,
      token: localStorage.getItem(constants.tokenCode),
      vote: 1
    }).subscribe(data => {});
  }

  setImage(img) {
    this.popupImage = img;
  }

  calculateVoteCountLeft(count) {
    if(count < 10) {
      return '9px';
    } else if ((count >= 10) && (count < 100)) {
      return '5px';
    } else {
      return '0px';
    }
  }

  calculateReviewVoteCountLeft(count) {
    if(count < 10) {
      return '5px';
    } else if ((count >= 10) && (count < 100)) {
      return '1px';
    } else {
      return '0px';
    }
  }
}
