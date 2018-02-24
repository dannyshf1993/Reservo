import { Component, ViewChild } from '@angular/core';

import { AlertController, App, FabContainer, ItemSliding, List, ModalController, NavController, ToastController, LoadingController, Refresher, Content, IonicPage } from 'ionic-angular';

import {ElementRef,Renderer } from '@angular/core';
import { NavParams } from 'ionic-angular';
/*
  To learn how to use third party libs in an
  Ionic app check out our docs here: http://ionicframework.com/docs/v2/resources/third-party-libs/
*/
// import moment from 'moment';

import { ConferenceData } from '../../providers/conference-data';
import { UserData } from '../../providers/user-data';

import { SessionDetailPage } from '../session-detail/session-detail';
import { ScheduleFilterPage } from '../schedule-filter/schedule-filter';
/**
 * Generated class for the FavouritePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-favourite',
  templateUrl: 'favourite.html',
  styles: [
    `
    /* Fix the spinner used in e2e */
    .fixed-spinner svg {
      animation: none;
    }
    `,
    `
    .custom-spinner-container {
      position: relative;
      display: inline-block;
      box-sizing: border-box;
    }
    `,
    `
    .custom-spinner-box {
      position: relative;
      box-sizing: border-box;
      border: 4px solid #000;
      width: 60px;
      height: 60px;
      animation: spin 3s infinite linear;
    }
    `,
    `
    .custom-spinner-box:before {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      box-sizing: border-box;
      border: 4px solid #000;
      width: 40px;
      height: 40px;
      animation: pulse 1.5s infinite ease;
    }
    `,
    `
    .wp .custom-spinner-box,
    .wp .custom-spinner-box:before {
      border-color: #fff;
    }
    `
    ,
    `
    @-webkit-keyframes pulse {
      50% {
        border-width: 20px;
      }
    }
    `,
    `
    @keyframes pulse {
      50% {
        border-width: 20px;
      }
    }
    `,
    `
    @-webkit-keyframes spin {
      100% {
        -webkit-transform: rotate(360deg);
                transform: rotate(360deg);
      }
    }
    `,
    `@keyframes spin {
      100% {
        -webkit-transform: rotate(360deg);
                transform: rotate(360deg);
      }
    }`]
})
export class FavouritePage {
// the list is a child of the schedule page
  // @ViewChild('scheduleList') gets a reference to the list
  // with the variable #scheduleList, `read: List` tells it to return
  // the List and not a reference to the element
  @ViewChild('scheduleList', { read: List }) scheduleList: List;
  @ViewChild("contentRef") contentHandle: Content;

  public items = [];
  private tabBarHeight;
  private topOrBottom: string;
  private contentBox;

  dayIndex = 0;
  queryText = '';
  segment = 'all';
  excludeTracks: any = [];
  shownSessions: any = [];
  groups: any = [];
  confDate: string;

  start = 0;
  threshold = 100;
  slideHeaderPrevious = 0;
  ionScroll: any;
  showheader: boolean;
  hideheader: boolean;
  headercontent: any;

  constructor(
    public alertCtrl: AlertController,
    public app: App,
    public loadingCtrl: LoadingController,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    public confData: ConferenceData,
    public user: UserData,
    public navCtrl: NavController,
    public renderer: Renderer,
    public myElement: ElementRef,
    public navParams: NavParams
  ) {
    this.showheader =false;
    this.hideheader = true;
    this.segment = 'favorites';
   }

  ionViewDidLoad() {
    this.app.setTitle('Schedule');
    this.updateSchedule();
  }

  updateSchedule() {
    // Close any open sliding items when the schedule updates
    this.scheduleList && this.scheduleList.closeSlidingItems();

    this.confData.getTimeline(this.dayIndex, this.queryText, this.excludeTracks, this.segment).subscribe((data: any) => {
      this.shownSessions = data.shownSessions;
      this.groups = data.groups;
    });
  }

  presentFilter() {
    let modal = this.modalCtrl.create(ScheduleFilterPage, this.excludeTracks);
    modal.present();

    modal.onWillDismiss((data: any[]) => {
      if (data) {
        this.excludeTracks = data;
        this.updateSchedule();
      }
    });

  }

  goToSessionDetail(sessionData: any) {
    // go to the session detail page
    // and pass in the session data

    this.navCtrl.push(SessionDetailPage, { sessionId: sessionData.id, name: sessionData.name });
  }

  addFavorite(slidingItem: ItemSliding, sessionData: any) {

    if (this.user.hasFavorite(sessionData.name)) {
      // woops, they already favorited it! What shall we do!?
      // prompt them to remove it
      this.removeFavorite(slidingItem, sessionData, 'Favorite already added');
    } else {
      // remember this session as a user favorite
      this.user.addFavorite(sessionData.name);

      // create an alert instance
      let alert = this.alertCtrl.create({
        title: 'Favorite Added',
        buttons: [{
          text: 'OK',
          handler: () => {
            // close the sliding item
            slidingItem.close();
          }
        }]
      });
      // now present the alert on top of all other content
      alert.present();
    }

  }

  removeFavorite(slidingItem: ItemSliding, sessionData: any, title: string) {
    let alert = this.alertCtrl.create({
      title: title,
      message: 'Would you like to remove this restaurant from your favorites?',
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            // they clicked the cancel button, do not remove the session
            // close the sliding item and hide the option buttons
            slidingItem.close();
          }
        },
        {
          text: 'Remove',
          handler: () => {
            // they want to remove this session from their favorites
            this.user.removeFavorite(sessionData.name);
            this.updateSchedule();

            // close the sliding item and hide the option buttons
            slidingItem.close();
          }
        }
      ]
    });
    // now present the alert on top of all other content
    alert.present();
  }

  openSocial(network: string, fab: FabContainer) {
    let loading = this.loadingCtrl.create({
      content: `Posting to ${network}`,
      duration: (Math.random() * 1000) + 500
    });
    loading.onWillDismiss(() => {
      fab.close();
    });
    loading.present();
  }

  doRefresh(refresher: Refresher) {
    this.confData.getTimeline(this.dayIndex, this.queryText, this.excludeTracks, this.segment).subscribe((data: any) => {
      this.shownSessions = data.shownSessions;
      this.groups = data.groups;

      // simulate a network request that would take longer
      // than just pulling from out local json file
      setTimeout(() => {
        refresher.complete();

        const toast = this.toastCtrl.create({
          message: 'Sessions have been updated.',
          duration: 3000
        });
        toast.present();
      }, 1000);
    });
  }

  ionViewDidEnter() {
    this.topOrBottom=this.contentHandle._tabsPlacement;
    this.contentBox=document.querySelector(".scroll-content")['style'];
  
    if (this.topOrBottom == "top") {
      this.tabBarHeight = this.contentBox.marginTop;
    } else if (this.topOrBottom == "bottom") {
      this.tabBarHeight = this.contentBox.marginBottom;
    }
  }
 
  scrollingFun(e) {
    if (e.scrollTop > this.contentHandle.getContentDimensions().contentHeight) {
      document.querySelector(".tabbar")['style'].display = 'none';
      if (this.topOrBottom == "top") {
        this.contentBox.marginTop = 0;
      } else if (this.topOrBottom == "bottom") {
        this.contentBox.marginBottom = 0;
      }
 
    } else {
      document.querySelector(".tabbar")['style'].display = 'flex';
      if (this.topOrBottom == "top") {
        this.contentBox.marginTop = this.tabBarHeight;
      } else if (this.topOrBottom == "bottom") {
        this.contentBox.marginBottom = this.tabBarHeight;
      }
 
    }//if else
  }//

  ngOnInit() {
    // Ionic scroll element
    this.ionScroll = this.myElement.nativeElement.getElementsByClassName('scroll-content')[0];
    // On scroll function
    this.ionScroll.addEventListener("scroll", () => {
    if(this.ionScroll.scrollTop - this.start > this.threshold) {
    this.showheader =true;
    this.hideheader = false;
    } else {
    this.showheader =false;
    this.hideheader = true;
    }
    if (this.slideHeaderPrevious >= this.ionScroll.scrollTop - this.start) {
    this.showheader =false;
    this.hideheader = true;
    }
    this.slideHeaderPrevious = this.ionScroll.scrollTop - this.start;
    });
    }

}
