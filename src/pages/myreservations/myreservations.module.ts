import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyreservationsPage } from './myreservations';

@NgModule({
  declarations: [
    MyreservationsPage,
  ],
  imports: [
    IonicPageModule.forChild(MyreservationsPage),
  ],
})
export class MyreservationsPageModule {}
