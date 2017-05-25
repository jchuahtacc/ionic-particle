import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { ParticleProvider } from '../../providers/particle/particle';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public var1: any;
  
  constructor(public navCtrl: NavController, public particle: ParticleProvider) {
  }

  ionViewDidLoad() {
    this.login()
  }

  ionViewDidEnter() {
    if (this.particle.device) {
        this.particle.pollVariable("var1").subscribe(
            (value) => { this.var1 = value; },
            (error) => { console.log("Error reading var1"); },
            () => { console.log("Stopped polling var1"); }
        );
    }
  }

  login() {
    this.navCtrl.push( LoginPage );
  }

  callFunction() {
    this.particle.callFunction("fun1");
  }
}
