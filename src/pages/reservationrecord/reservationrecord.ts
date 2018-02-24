import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ConferenceData } from '../../providers/conference-data';
import { FirebaseListObservable, AngularFireDatabase } from 'angularfire2/database-deprecated';
import { CommentsService } from '../service/comments.services';
import { SchedulePage } from '../schedule/schedule';
import firebase from 'firebase';
import { ActionSheetController } from 'ionic-angular/components/action-sheet/action-sheet-controller';

/**
 * Generated class for the ReservationrecordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-reservationrecord',
  templateUrl: 'reservationrecord.html',
})
export class ReservationrecordPage {
  firedata = firebase.database().ref('/reservedDate');

  myDate: String = new Date().toISOString();
  session: any;
  reservedguestsnumber: FirebaseListObservable<any[]>;
  customerinformation: FirebaseListObservable<any>;
  restaurantsone: FirebaseListObservable<any>;

  comments: { restname: string, hourtitle: string, title: string, tit: string, request: string, table: string, name: string, phone: string, email: string, firebaseid: string }[] = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public dataProvider: ConferenceData,
    public cs: CommentsService,
    public afd: AngularFireDatabase,
    public actionSheetCtrl: ActionSheetController
  ) {

  }

  ionViewWillEnter() {

    this.cs.getComments()
      .then(
      (comments) =>
        this.comments = comments
      )
  }

  ionViewDidEnter() {
    
  }
  /////////so far only works right after the reservation is made


  onReturnPage() {
    this.navCtrl.setRoot(SchedulePage);
  }

  // showOptions() {
  //   let actionSheet = this.actionSheetCtrl.create({
  //     title: 'What do you want to do?',
  //     buttons: [
  //       {
  //         text: 'Cancel reservation',
  //         role: 'destructive',
  //         handler: () => {
  //           // this.removeComment(comment);
  //         }
  //       },{
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

  // removeSong(){
  //   console.log(this.comments);
        
  //    //   var key = this.comments[i].name;
  //    //   this.firedata.child(this.comments[i].restname).child('/photoURL').child(key).remove();
  //  }

  removeComment(comment) {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'What do you want to do?',
      buttons: [
        {
          text: 'Cancel reservation',
          role: 'destructive',
          handler: () => {

            for (var i = 0; i < this.comments.length; i++) {
              if (this.comments[i] === comment) {
             
                this.comments.splice(i,1);
                // console.log(comment);
                this.firedata.child(comment.restname).child('/photoURL').child(comment.name + comment.phone).remove();
                this.cs.removeComments();
              }
            }

          }
        },{
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
    
    
  }  
}
