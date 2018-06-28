import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the ThingspeakProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class ThingspeakProvider {
  public writeKey: string = '';
  public readKey: string = '';
  public channel: string = '';
  private apiUrl: string = 'https://api.thingspeak.com';

  constructor(public http: Http) {
    console.log('Hello ThingspeakProvider Provider');
  }

  getChannel(results: number = 10) {
    var url = this.apiUrl + '/channels/' + this.channel + '/feeds.json?api_key=' + this.readKey + '&results=' + results;
    return this.http.get(url);
  }

}
