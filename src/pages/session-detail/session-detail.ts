import { Component, ViewChild, ElementRef, Injectable } from '@angular/core';
import { IonicPage, NavParams, Slides, NavController } from 'ionic-angular';

import { ConferenceData } from '../../providers/conference-data';
import { ReservationpagePage } from '../reservationpage/reservationpage';
import { CommentsService } from '../service/comments.services';

import { Platform } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { ModalController } from 'ionic-angular/components/modal/modal-controller';
import { LocationmapPage } from '../locationmap/locationmap';
// import { MapPage } from '../map/map';
import { CallNumber } from '@ionic-native/call-number';
import { SupportPage } from '../support/support';

declare var google: any;
@Injectable()
@IonicPage({
  // segment: 'session/:sessionId'
})
@Component({
  selector: 'page-session-detail',
  templateUrl: 'session-detail.html'
})
export class SessionDetailPage {
  @ViewChild('mapContainer') mapContainer: ElementRef;
  @ViewChild('slides') slides: Slides;
  map: any;
  session: any;
  showSkip = true;

  public comments: { title: string }[] = [];

  constructor(
    public confData: ConferenceData,
    public dataProvider: ConferenceData,
    public navParams: NavParams,
    public navCtrl: NavController,
    public cs: CommentsService,
    public platform: Platform,
    public modalCtrl: ModalController,
    public http: Http,
    private callNumber: CallNumber,
  ) { }

  onSlideChangeStart(slider: Slides) {
    this.showSkip = !slider.isEnd();
  }

  ionViewWillEnter() {
    this.displayGoogleMap();
    this.getMarkers();
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
                console.log(this.session);

                break;
              }
            }
          }
        }
      }
    });
  }

  onFullScreen(sessionData: any) {
    this.navCtrl.push(SupportPage, { sessionId: sessionData.id, name: sessionData.name });
  }


  displayGoogleMap() {
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

                console.log(this.session.name);
                console.log(this.session.panoURL);

                let latLng = new google.maps.LatLng(this.session.lat, this.session.lng);
                let mapOptions = {
                  center: latLng,
                  zoom: 27,
                  mapTypeId: google.maps.MapTypeId.ROADMAP,

                }
                this.map = new google.maps.Map(this.mapContainer.nativeElement, mapOptions);;

                break;
              }
            }
          }
        }
      }
    });

  }
  getMarkers() {
    this.http.get('assets/data/data.json')
      .map((res) => res.json())
      .subscribe(data => {
        // let schedule = data.schedule;
        // let groups = schedule[0].groups;
        for (const group of data.schedule[0].groups) {
          if (group && group.sessions) {

            let session = group.sessions;

            this.addMarkersToMap(session);
          }

        }

      });
  }

  addMarkersToMap(markers) {
    for (let marker of markers) {
      var icon = {
        url: 'assets/marker/free-8-blue.png', // url
        scaledSize: new google.maps.Size(32, 32), // scaled size
        // origin: new google.maps.Point(0, 0), // origin
        // anchor: new google.maps.Point(0, 0) // anchor
      };

      var position = new google.maps.LatLng(marker.lat, marker.lng);
      var dogwalkMarker = new google.maps.Marker({
        position: position,
        title: marker.name,
        icon: icon,

      });
      dogwalkMarker.setMap(this.map);


    }
  }

  onReservationPage(sessionData: any) {
    // go to the session detail page
    // and pass in the session data

    this.navCtrl.push(ReservationpagePage, { sessionId: sessionData.id, name: sessionData.name });
  }

  onMap(sessionData: any) {
    this.navCtrl.push(LocationmapPage, { sessionId: sessionData.id, name: sessionData.name });

    // this.modalCtrl.create(LocationmapPage).present();
  }

  onCall() {
    this.callNumber.callNumber("96769157", true)
      .then(() => console.log('Launched dialer!'))
      .catch(() => console.log('Error launching dialer'));
  }
}
