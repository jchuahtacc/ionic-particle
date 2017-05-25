import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides } from 'ionic-angular';
import { ParticleProvider } from '../../providers/particle/particle';
import { AppPreferences } from '@ionic-native/app-preferences';

/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  email: string;
  password: string;
  loginFailed: boolean = false;
  loading: boolean = true;
  currentSlide: string = "welcomeSlide";
  @ViewChild('setupSlides') setupSlides: Slides;

  constructor(public navCtrl: NavController, public navParams: NavParams, public particle: ParticleProvider, private prefs: AppPreferences) {
    console.log("LoginPage constructor");
  }

  ngAfterViewInit() {
    this.setupSlides.lockSwipes(true);
    this.setupSlides.pager = true;
  }

  ionViewDidLoad() {
    this.doWelcomeSlide();
  }

  doLoginSlide() {
    this.currentSlide = 'loginSlide';
  }

  doWelcomeSlide() {
    this.currentSlide = 'welcomeSlide';
    let errorCallback = (error) => { this.particle.logout(); this.loading = false; };
    this.prefs.fetch("token").then(
        (token) => {
            this.particle.setToken(token).then(
                (userInfo) => {
                    console.log("User token", this.particle.token);
                    this.loading = false;
                },
                (error) => {
                    console.log("User token invalid", token);
                    this.particle.logout();
                    this.loading = false;
                }
            );
        },
        errorCallback
    );
  }

  doDeviceSlide() {
    this.currentSlide = 'deviceSlide';
  }

  doLogin() {
    this.particle.login( this.email, this.password ).then(
        (data) => {
            this.loginFailed = false;
            this.doDeviceSlide();
        },
        (error) => {
            this.loginFailed = true;
        }
    );
  }

  continueButton() {
    if (!this.particle.token) {
       this.doLoginSlide(); 
    }
  }


}
