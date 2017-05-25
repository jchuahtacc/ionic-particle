import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides } from 'ionic-angular';
import { ParticleProvider } from '../../providers/particle/particle';
import { AppPreferences } from '@ionic-native/app-preferences';
import { Observable } from 'rxjs/Rx';

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
  @ViewChild('setupSlides') setupSlides: Slides;

  constructor(public navCtrl: NavController, public navParams: NavParams, public particle: ParticleProvider, private prefs: AppPreferences) {
    console.log("LoginPage constructor");
  }

  ngAfterViewInit() {
    this.setupSlides.lockSwipeToNext(true);
  }

  slideChanged() {
      switch (this.setupSlides.getActiveIndex()) {
        case 0 : this.doWelcomeSlide(); break;
        case 2 : this.doDeviceSlide(); break;
        default : break;
      }
  }

  ionViewDidLoad() {
    this.doWelcomeSlide();
  }

  doWelcomeSlide() {
    console.log("doWelcomeSlide");
    let errorCallback = (error) => { this.particle.setToken(null); };
    this.prefs.fetch("token").then(
        (token) => {
            this.particle.api.getUserInfo({ auth: token }).then(
                (data) => { 
                    this.particle.setToken(token);
                },
                errorCallback 
            );
        },
        errorCallback
    );
  }

  doDeviceSlide() {
  }

  test() {
    this.particle.getEventSubscription("event1", "mine").subscribe(
        (event) => {
            console.log("Event stream event", event);
        },
        (error) => {
            console.log("event stream error", error);
        },
        () => {
            console.log("event stream complete");
        }
    );

  }

  doLogin() {
    this.particle.login( this.email, this.password ).then(
        (data) => {
            this.loginFailed = false;
            console.log("Login successful", data);
            this.test();
        },
        (error) => {
            this.loginFailed = true;
            console.log(error);
        }
    );
  }
}
