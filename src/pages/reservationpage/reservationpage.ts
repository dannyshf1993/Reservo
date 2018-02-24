import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AlertController } from 'ionic-angular';
import { ActionSheetController } from 'ionic-angular';

import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database-deprecated";
import { ReservationrecordPage } from '../reservationrecord/reservationrecord';
import { ConferenceData } from '../../providers/conference-data';


import { TermandconditionsPage } from '../termandconditions/termandconditions';
import { PrivacypolicyPage } from '../privacypolicy/privacypolicy';
import { CommentsService } from '../service/comments.services';
import firebase from 'firebase';
/**cor
 * Generated class for the ReservationpagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  segment: 'session/:sessionId'
})
@Component({
  selector: 'page-reservationpage',
  templateUrl: 'reservationpage.html',
})
export class ReservationpagePage {
  key: any;

  firedata = firebase.database().ref('/reservedDate');
  reservation: any;
  reservedguestsseatlocation: FirebaseListObservable<any[]>;
  myDate: String = new Date().toISOString();

  myHour: String;
  session: any;
  conferenceDate = '2017-12-31';
  testCheckboxResult: any;
  testCheckboxResultSeatlocations: any;

  testDateResult: any;
  testCheckboxOpen: boolean;
  reservedguestsnumber: FirebaseListObservable<any[]>;
  customerrequest: FirebaseListObservable<any>;
  customerinformation: FirebaseListObservable<any>;
  restaurantsone: FirebaseListObservable<any>;
  restaurantsname: FirebaseListObservable<any[]>;
  reservedDate: FirebaseListObservable<any[]>;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public dataProvider: ConferenceData,
    public alertCtrl: AlertController,
    public afd: AngularFireDatabase,

    public cs: CommentsService,
    public actionSheetCtrl: ActionSheetController
  ) {

    this.customerrequest = this.afd.list('/customerrequest');
    this.customerinformation = this.afd.list('/customerinformation');
    this.restaurantsone = this.afd.list('/restaurantsone');
    this.reservedguestsseatlocation = this.afd.list('/reservedguestsseatlocation');
    this.reservedguestsnumber = this.afd.list('/reservedguestsnumber');
    this.restaurantsname = this.afd.list('/restaurantsname');
    this.reservedDate = this.afd.list('/reservedDate');

  }
  onAddComment(value: { restname: string, key: string, hourtitle: string, title: string, tit: string, request: string, table: string, name: string, phone: string, email: string, firebaseid: string }) {

  // onAddComment(value: { hourtitle: string, title: string, tit: string, request: string, table: string, name: string, phone: string, email: string, restname: string, firebaseid: string }, sessionData: any) {
    this.dataProvider.load().subscribe((data: any) => {
      if (
        data &&
        data.schedule &&
        data.schedule[0] &&
        data.schedule[0].groups
      ) {
        for (const group of data.schedule[0].groups) {
          if (group && group.sessions) {
            for (const session of group.sessions) {
              if (session && session.id === this.navParams.data.sessionId) {
                this.session = session;
                // console.log(value.title);
                var date = this.myDate.substring(0, 10);
                
                this.firedata.child(this.session.name).child('/photoURL').child(value.name+value.phone).set({
                  Reserved_restaurant_name: this.session.name,
                  Reserved_Date_hour: value.hourtitle,

                  Reserved_Date: date,
                  Reserved_Guests_number: value.tit,
                  Reserved_Special_request: value.request,

                  Reserved_Customer_name: value.name,
                  Reserved_Cutomer_phone: value.phone,
                  Reserved_Customer_email: value.email,
                                    
                })

                
                value.restname = this.session.name;
                // value.firebaseid = this.key;
                // console.log(value);

                this.cs.addComment(value);

                break;
              }
            }
          }
        }
      }
    });
     

    this.navCtrl.push(ReservationrecordPage);
    // this.navCtrl.push(ReservationrecordPage, { sessionId: sessionData.id, name: sessionData.name });
  }


  ionViewWillEnter() {
    this.dataProvider.load().subscribe((data: any) => {
      if (
        data &&
        data.schedule &&
        data.schedule[0] &&
        data.schedule[0].groups
      ) {
        for (const group of data.schedule[0].groups) {
          if (group && group.sessions) {
            for (const session of group.sessions) {
              if (session && session.id === this.navParams.data.sessionId) {
                this.session = session;

                // this.restaurantsname.push({
                //   restaurantsName: this.session.name,
                // })
                break;
              }
            }
          }
        }
      }
    });
  }

  // addPersonalInfo() {
  //   let prompt = this.alertCtrl.create({
  //     title: 'Contact information',
  //     message: "Please fill in your information for reservation.",
  //     inputs: [
  //       {
  //         name: 'title',
  //         placeholder: 'Name'
  //       },
  //       {
  //         name: 'phone',
  //         placeholder: 'Your phone number'
  //       },
  //       {
  //         name: 'email',
  //         placeholder: 'Your email address'
  //       }
  //     ],
  //     buttons: [
  //       // {
  //       //   text: 'Cancel',
  //       //   handler: data => {
  //       //     console.log('Cancel clicked');
  //       //   }
  //       // },
  //       {
  //         text: 'Save',
  //         handler: data => {

  //           this.customerinformation.push({
  //             title: data.title,
  //             phone: data.phone,
  //             email: data.email
  //           });
  //         }
  //       }
  //     ]
  //   });
  //   prompt.present();
  // }

  // showOptions(songId, nameTitle, phone, email) {
  //   let actionSheet = this.actionSheetCtrl.create({
  //     title: 'What do you want to do?',
  //     buttons: [
  //       {
  //         text: 'Delete',
  //         role: 'destructive',
  //         handler: () => {
  //           this.removeCustomerInformation(songId);
  //         }
  //       }, {
  //         text: 'Update personal information',
  //         handler: () => {
  //           this.updateSong(songId, nameTitle, phone, email);
  //         }
  //       }, {
  //         text: 'Cancel',
  //         role: 'cancel',
  //         handler: () => {
  //           console.log('Cancel clicked');
  //         }
  //       }
  //     ]
  //   });
  //   actionSheet.present();
  // }

  // removeCustomerInformation(songId: string) {
  //   this.customerinformation.remove(songId);
  // }

  // updateSong(songId, nameTitle, phone, email) {
  //   let prompt = this.alertCtrl.create({
  //     title: 'Personal information',
  //     message: "Update your personal information",
  //     inputs: [
  //       {
  //         name: 'title',
  //         placeholder: 'Your name',
  //         value: nameTitle
  //       },
  //       {
  //         name: 'phone',
  //         placeholder: 'Your phone number',
  //         value: phone
  //       },
  //       {
  //         name: 'email',
  //         placeholder: 'Your email address',
  //         value: email
  //       },

  //     ],
  //     buttons: [
  //       // {
  //       //   text: 'Cancel',
  //       //   handler: data => {
  //       //     console.log('Cancel clicked');
  //       //   }
  //       // },
  //       {
  //         text: 'Save',
  //         handler: data => {

  //           this.customerinformation.update(songId, {
  //             title: data.title,
  //             phone: data.phone,
  //             email: data.email
  //           });
  //         }
  //       }
  //     ]
  //   });
  //   prompt.present();
  // }



  pushtnc() {
    this.navCtrl.push(TermandconditionsPage);
  }

  pushpnp() {
    this.navCtrl.push(PrivacypolicyPage);
  }

}
