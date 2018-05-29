import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VariablePage } from './variable';

@NgModule({
  declarations: [
    VariablePage,
  ],
  imports: [
    IonicPageModule.forChild(VariablePage),
  ],
  exports: [
    VariablePage
  ]
})
export class VariablePageModule {}
