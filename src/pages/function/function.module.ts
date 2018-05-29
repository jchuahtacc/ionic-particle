import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FunctionPage } from './function';

@NgModule({
  declarations: [
    FunctionPage,
  ],
  imports: [
    IonicPageModule.forChild(FunctionPage),
  ],
  exports: [
    FunctionPage
  ]
})
export class FunctionPageModule {}
