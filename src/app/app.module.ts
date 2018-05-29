import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule, MenuController } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { FunctionPage } from '../pages/function/function';
import { VariablePage } from '../pages/variable/variable';
import { ProgressPage } from '../pages/progress/progress';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ParticleProvider } from '../providers/particle/particle';

import { DeviceListComponent } from '../components/device-list/device-list';
import { ParticleProgressComponent } from '../components/particle-progress/particle-progress';

import { IonicStorageModule } from '@ionic/storage';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    FunctionPage,
    VariablePage,
    ProgressPage,
    DeviceListComponent,
    ParticleProgressComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    FunctionPage,
    VariablePage,
    ProgressPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ParticleProvider,
    MenuController
  ]
})
export class AppModule {}
