// Modules
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {TimeAgoPipe} from 'time-ago-pipe';

// Components
import {AppComponent} from './app.component';
import {TopStoriesComponent} from './top-stories/top-stories.component';
import {HomeComponent} from './home/home.component';
import {LoginPageComponent} from './login-page/login-page.component';
import {SignupPageComponent} from './signup-page/signup-page.component';
import {ForgotPasswordPageComponent} from './forgot-password-page/forgot-password-page.component';
import {VerifyEmailPageComponent} from './verify-email-page/verify-email-page.component';
import {ViewArticleComponent} from './view-article/view-article.component';
import {NotificationsComponent} from './notifications/notifications.component';
import {AccountComponent} from './account/account.component';
import {SettingsComponent} from './settings/settings.component';
import {TopWritersComponent} from './top-writers/top-writers.component';
import {AboutComponent} from './about/about.component';
import {ProfileComponent} from './profile/profile.component';
import {SetNewPasswordComponent} from './set-new-password/set-new-password.component';
// Services
import {WindowRef} from './services/window.service';
import {GrowlService} from './services/growl.service';
import {RegisterService} from './services/register.service';
import {VerificationService} from './services/verification.service';
import {LoginService} from './services/login.service';
import {AuthService} from './services/auth.service';
import {GetArticlesService} from './services/get-articles.service';
import {ReviewService} from './services/review.service';
import {SafePipe} from './view-article/safe-pipe';

const routes = [
  { path: '', component: HomeComponent},
  { path: 'top-stories', component: TopStoriesComponent},
  { path: 'login', component: LoginPageComponent},
  { path: 'signup', component: SignupPageComponent},
  { path: 'forgot-password', component: ForgotPasswordPageComponent},
  { path: 'verify-email/:token', component: VerifyEmailPageComponent},
  { path: 'reset-password/:token', component: SetNewPasswordComponent},
  { path: 'article/:token', component: ViewArticleComponent},
  { path: 'profile/:token', component: ProfileComponent},
  { path: 'notifications', component: NotificationsComponent}
];


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TopStoriesComponent,
    LoginPageComponent,
    SignupPageComponent,
    ForgotPasswordPageComponent,
    VerifyEmailPageComponent,
    ViewArticleComponent,
    NotificationsComponent,
    AccountComponent,
    SettingsComponent,
    TopWritersComponent,
    SetNewPasswordComponent,
    ProfileComponent,
    TimeAgoPipe,
    AboutComponent,
    SafePipe
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
  ],
  providers: [
    WindowRef,
    GrowlService,
    RegisterService,
    VerificationService,
    LoginService,
    AuthService,
    GetArticlesService,
    ReviewService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
