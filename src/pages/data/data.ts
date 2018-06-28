import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ThingspeakProvider } from '../../providers/thingspeak/thingspeak';
import { ParticleProvider } from '../../providers/particle/particle';

/**
 * Generated class for the DataPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-data',
  templateUrl: 'data.html',
})
export class DataPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public thingspeak: ThingspeakProvider, public particle: ParticleProvider) {
    thingspeak.readKey = '8MUTD1PVX9J5V9PJ';
    thingspeak.channel = '431376';
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DataPage');
  }

  refresh() {
    this.thingspeak.getChannel().subscribe(
        (data) => { console.log("data", data); },
        (error) => { console.log("error", error); },
        () => { console.log("canceled"); }
    );
  }

}
