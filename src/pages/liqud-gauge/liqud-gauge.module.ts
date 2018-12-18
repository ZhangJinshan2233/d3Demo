import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LiqudGaugePage } from './liqud-gauge';

@NgModule({
  declarations: [
    LiqudGaugePage,
  ],
  imports: [
    IonicPageModule.forChild(LiqudGaugePage),
  ],
})
export class LiqudGaugePageModule {}
