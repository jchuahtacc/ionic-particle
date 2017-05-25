import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides } from 'ionic-angular';
import { ParticleProvider } from '../../providers/particle/particle';
import { AppPreferences } from '@ionic-native/app-preferences';
import { DeviceListComponent } from '../../components/device-list/device-list';

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
  readyState: string = "loading";
  currentSlide: string = "welcomeSlide";
  selectedDeviceId: string = null;
  selectedDeviceName: string = null;
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
    let fetchDevices = () => {
        this.loading = true;
        this.particle.listDevices().then(
            (devices) => {
                this.loading = false;
            },
            (error) => {
                this.loading = false;
            }
        ); 
    };
    fetchDevices();
  }


  doReadySlide(deviceId? : string) {
    this.currentSlide = 'readySlide';
    this.readyState = "loading";
    let setDevice = (deviceId) => {
        this.particle.setDevice(deviceId).then(
            (device) => {
                if (device["connected"]) {
                    this.readyState = 'ready';
                } else {
                    this.readyState = 'offline';
                }
            },
            (error) => {
                this.readyState = 'notfound';
            }
        );
    }

    if (deviceId) {
        setDevice(deviceId);
    } else {
        this.prefs.fetch("deviceId").then(
            setDevice,
            (error) => {
                this.doDeviceSlide();
            }
        );
    }
  }

  doLogin() {
    this.particle.login( this.email, this.password ).then(
        (data) => {
            this.loginFailed = false;
            this.doReadySlide();
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

  onDeviceSelect(device) {
    this.doReadySlide(device["id"]);
  }

}
