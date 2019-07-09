import {Component, OnInit} from '@angular/core';
import {WindowRef} from '../services/window.service';
import {AuthService} from '../services/auth.service';
import {constants} from '../services/constants';
import {GrowlService} from '../services/growl.service';
import {GetArticlesService} from '../services/get-articles.service';

declare var $: any;
// import { RegisterService } from '../services/register.service';
// declare var grecaptcha: any;


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css', './menu.css']
})
export class HomeComponent implements OnInit {

  auth = 2;
  user = {};
  articles = [];


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
  accountActive = '';
  settingsActive = '';
  loading = true;
  hasscrolled = false;

  constructor(private window: WindowRef,
              private authService: AuthService,
              private growlService: GrowlService,
              private getArticlesService: GetArticlesService) {}

  ngOnInit() {

    // window.scrollto()
    console.log('this.authService.scrollposition', this.authService.scrollposition);

    $(window).scroll(() => {
      if(this.hasscrolled && window.location.pathname == '/') {
        const scroll = $(window).scrollTop();
        this.authService.scrollposition = scroll;
      }
    });

    $('.vote-arrows').on('click', function(el) {
      $(el).toggleClass('vote-arrows-clicked');
    })

    if(this.authService.goto == 'settings') {
      this.navigatePageTo('settingsActive');
      this.authService.goto = '';
    }

    if(this.authService.goto == 'account') {
      this.navigatePageTo('accountActive');
      this.authService.goto = '';
    }




    if (this.authService.loggedin) {
      console.log('logged in 2');
      this.scrollToLastPosition();
    } else {
      console.log('not logged in 2');
      this.authService.authenticate().subscribe(data => {
        this.loading = false;

        if (data.msg == 'Success!') {
          this.authService.user = data.data;
          this.auth = 1;
        } else {
          this.auth = 0;
        }

        this.scrollToLastPosition();
      });
    }

    // this.topStoriesActive = '';
    // this.accountActive = 'active';
  }

  scrollToLastPosition() {
    setTimeout(() => {
      console.log('this.authService.scrollposition2', this.authService.scrollposition);
      window.scrollTo(0, this.authService.scrollposition);
      this.hasscrolled = true;
      $('.content-wrapper-here').toggleClass('hide-everything');
      const scroll = $(window).scrollTop();
      this.authService.scrollposition = scroll;
    }, 250);
  }

  navigatePageTo(page) {
    console.log('page', page);

      if(page == 'settingsActive'){
        this.settingsActive = 'active';
        this.accountActive = '';
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

      if(page == 'accountActive') {
        this.settingsActive = '';
        this.accountActive = 'active';
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

      if(page == 'topStoriesActive') {
        this.settingsActive = '';
        this.accountActive = '';
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
        this.accountActive = '';
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
        this.accountActive = '';
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
        this.accountActive = '';
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
        this.accountActive = '';
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
        this.accountActive = '';
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
        this.accountActive = '';
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
        this.accountActive = '';
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
        this.accountActive = '';
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
        this.accountActive = '';
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

      console.log(page);

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

}
