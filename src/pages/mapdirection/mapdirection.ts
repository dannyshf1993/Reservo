import { IonicPage, NavController, NavParams, ModalController, ViewController } from 'ionic-angular';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { ConferenceData } from '../../providers/conference-data';

import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';

import 'rxjs/add/operator/map';

declare var google;
@Injectable()
@IonicPage()
@Component({
  selector: 'page-mapdirection',
  templateUrl: 'mapdirection.html',
})
export class MapdirectionPage {
  @ViewChild('mapContainer') mapContainer: ElementRef;
  @ViewChild('directionsPanel') directionsPanel: ElementRef;
  session: any;
  map: any;
  infoWindows: any;
  buttonClicked: boolean = true;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public http: Http,
    public viewCtrl: ViewController,
    public dataProvider: ConferenceData,
    public platform: Platform,
  ) {
    this.infoWindows = [];
  }

  ionViewWillEnter() {
    this.loadMap();
    this.startNavigating();
 
  }

  loadMap() {

    let latLng = new google.maps.LatLng(22.3364, 114.1989);

    let mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }

    this.map = new google.maps.Map(this.mapContainer.nativeElement, mapOptions);

  }

  startNavigating() {

    let directionsService = new google.maps.DirectionsService;
    let directionsDisplay = new google.maps.DirectionsRenderer;

    directionsDisplay.setMap(this.map);
    directionsDisplay.setPanel(this.directionsPanel.nativeElement);

    directionsService.route({
      // origin: 'adelaide',
      // destination: 'adelaide oval',
      // origin: { lat: 22.3364, lng: 114.1989 },
      origin: { lat: 22.286394, lng: 114.149139 },
      destination: { lat: 22.281, lng: 114.155508 },
      travelMode: google.maps.TravelMode['WALKING']
    }, (res, status) => {

      if (status == google.maps.DirectionsStatus.OK) {
        directionsDisplay.setDirections(res);
      } else {
        console.warn(status);
      }

    });

  }



 

}