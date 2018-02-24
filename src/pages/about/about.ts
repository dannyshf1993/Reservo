import { Component } from '@angular/core';
import { PopoverController, NavController } from 'ionic-angular';

import { PopoverPage } from '../about-popover/about-popover';
import { CommentsService } from '../service/comments.services';
// import { SessionDetailPage } from '../session-detail/session-detail';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  myDate: String = new Date().toISOString();
  conferenceDate = '';

  constructor(
    public popoverCtrl: PopoverController,
    public navCtrl: NavController,
    public cs: CommentsService
  ) { }

  presentPopover(event: Event) {
    let popover = this.popoverCtrl.create(PopoverPage);
    popover.present({ ev: event });
  }


}
