import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { ParticleProvider } from '../providers/particle/particle';
import { LoginPage } from '../pages/login/login';
import { FunctionPage } from '../pages/function/function';
import { VariablePage } from '../pages/variable/variable';
import { ProgressPage } from '../pages/progress/progress';

import { HomePage } from '../pages/home/home';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, 
    public menu: MenuController, public particle: ParticleProvider) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'Functions', component: FunctionPage },
      { title: 'Variables', component: VariablePage },
      { title: 'Progress', component: ProgressPage }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  loginPage() {
    this.menu.close();  
    this.nav.push(LoginPage);
  }

  deviceSelect(device) {
    this.particle.setDevice(device.id);
  }
}
