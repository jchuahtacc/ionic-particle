import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ParticleProvider } from '../../providers/particle/particle';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, public particle: ParticleProvider) {
    console.log(this.particle);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
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
