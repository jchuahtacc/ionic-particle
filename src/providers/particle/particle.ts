import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';

/*
  Generated class for the ParticleProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class ParticleProvider {
  public api: any;
  public token: string = null;
  public devices: any = [ ];
  public deviceId: string = null;

  constructor() {
    var Particle = require('particle-api-js');
    this.api = new Particle();
  }

  setToken(token: string) {
    this.token = token;
  }

  setDevice(deviceId: string) {
    this.deviceId = deviceId;
    if (!deviceId) {
        return null;
    }
    return this.getDevice(deviceId);
  }

  getDevice(deviceId: string = this.deviceId) {
    var promise = new Promise((resolve, reject) => {
        this.api.getDevice({ deviceId: deviceId, auth: this.token }).then(
            (result) => {
                this.devices[deviceId] = result.body;
                resolve(result);
            },
            (error) => {
                this.devices[deviceId] = null;
                reject(error);
            }
        );
    });
    return promise;
  }

  getConnectionStatus(deviceId: string = this.deviceId) {
  }

  getEventStream(name: string = "mine", deviceId: string = this.deviceId) {
    return this.api.getEventStream({ name: name, deviceId: deviceId, auth: this.token });
  }

  getEventSubscription(name: string = "mine", deviceId: string = this.deviceId) {
    var observable = Observable.create(
        (observer) => {
            this.getEventStream(name, deviceId).then(
                (stream) => {
                    console.log("event stream", stream);
                    stream.on('event', (result) => {
                        observer.next(result);
                    });
                    stream.onerror = (error) => { observer.error(error); };
                    return () => {
                        stream.close();
                    };
                },
                (error) => {
                    observer.error(error);
                }
            );
        }
    );
    return observable;
  }

  login(email: string, password: string) {
    if (!(email.length && password.length)) {
        return null;
    }
    var promise = new Promise(
        (resolve, reject) => {
            this.api.login( { username: email, password: password } ).then(
                (data) => {
                    this.token = data.body.access_token;
                    resolve(data);
                },
                (error) => {
                    this.token = "";
                    reject(error);
                }
            );
        }
    );
    return promise;
  }

  logout() {
    this.setToken(null);
    this.setDevice(null);
  }

  listDevices() {
    var promise = new Promise( (resolve, reject) => {
        this.api.listDevices({ auth: this.token }).then(
            (data) => {
                if (data["statusCode"] != 200) {
                    reject(data);
                } else {

                    this.devices = data.body;
                    resolve(this.devices);
                }
            },
            (error) => {
                reject(error);
            }
        );
    });
    return promise;
  }

  getVariable(variable: string, deviceId : string = this.deviceId) {
    return this.api.getVariable({ name: variable, auth: this.token, deviceId: deviceId });
  }

  pollVariable(variable: string, interval: number = 2000, deviceId: string = this.deviceId) {
    var source = Observable.interval(interval).flatMap( (i) => {
        return Observable.fromPromise(this.getVariable(variable, deviceId));
    });
    return source;
  }

  callFunction(name: string, argument: any = null, deviceId: string = this.deviceId) {
    return this.api.callFunction({ name: name, auth: this.token, argument: argument, deviceId: deviceId });
  }

  publishEvent(name: string, data: any = null, isPrivate: boolean = true) {
    return this.api.publishEvent({ name: name, data: data, isPrivate: isPrivate, auth: this.token });
  }
}
