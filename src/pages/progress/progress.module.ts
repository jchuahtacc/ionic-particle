import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProgressPage } from './progress';

@NgModule({
  declarations: [
    ProgressPage,
  ],
  imports: [
    IonicPageModule.forChild(ProgressPage),
  ],
  exports: [
    ProgressPage
  ]
})
export class ProgressPageModule {}
