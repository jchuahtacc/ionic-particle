import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { ParticleProvider } from '../../providers/particle/particle';

@IonicPage()
@Component({
  selector: 'page-function',
  templateUrl: 'function.html',
})
export class FunctionPage {

  public functionExists: boolean = false;
  public functionName: string = 'fun1';

  constructor(public navCtrl: NavController, public navParams: NavParams, public particle: ParticleProvider) {
  }

  ionViewDidLoad() {
    if (!this.particle.token) {
    	this.login()
    } else {
        this.functionExists = this.particle.device && this.particle.device.functions && this.particle.device.functions.find(this.functionName);
    }
  }

  callFunction() {
    this.particle.callFunction(this.functionName);
  }

  login() {
    this.navCtrl.push( LoginPage );
  }

}
