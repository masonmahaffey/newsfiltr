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
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {

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

  constructor(private window: WindowRef,
              private authService: AuthService,
              private growlService: GrowlService,
              private getArticlesService: GetArticlesService) {}

  ngOnInit() {

    $('.vote-arrows').on('click', function(el) {
      $(el).toggleClass('vote-arrows-clicked');
    })

    if (this.authService.loggedin) {
      console.log('logged in 2');
    } else {
      console.log('not logged in 2');
      this.authService.authenticate().subscribe(data => {
        if (data.msg == 'Success!') {
          this.authService.user = data.data;
          this.auth = 1;
        } else {
          this.auth = 0;
        }
      });
    }
  }

  navigatePageTo(page) {
    console.log('page', page);

      if(page == 'topStoriesActive'){
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
