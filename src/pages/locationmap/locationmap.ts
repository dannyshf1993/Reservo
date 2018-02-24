import { Component, ElementRef, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { ConferenceData } from '../../providers/conference-data';

import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';

import 'rxjs/add/operator/map';
import { MapdirectionPage } from '../mapdirection/mapdirection';
import { Geolocation } from '@ionic-native/geolocation';

declare var google: any;
@Injectable()
@IonicPage()
@Component({
  selector: 'page-locationmap',
  templateUrl: 'locationmap.html',
})
export class LocationmapPage {
  geolng: number;
  geolat: number;
  @ViewChild('mapContainer') mapContainer: ElementRef;
  @ViewChild('directionsPanel') directionsPanel: ElementRef;

  session: any;
  map: any;
  infoWindows: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public http: Http,
    public viewCtrl: ViewController,
    public dataProvider: ConferenceData,
    public geolocation: Geolocation,
    public platform: Platform,
  ) {
    this.infoWindows = [];
  }

  ionViewWillEnter() {
    this.displayGoogleMap();
    // this.loadMap();
    this.getMarkers();
    this.startNavigating();
  }

  // loadMap() {

  //   this.geolocation.getCurrentPosition().then((position) => {

  //     let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

  //     let mapOptions = {
  //       center: latLng,
  //       zoom: 15,
  //       mapTypeId: google.maps.MapTypeId.ROADMAP
  //     }

  //     this.map = new google.maps.Map(this.mapContainer.nativeElement, mapOptions);

  //   }, (err) => {
  //     console.log(err);
  //   });

  // }

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
                let latLng = new google.maps.LatLng(this.session.lat, this.session.lng);

                // let latLng = new google.maps.LatLng(22.286394, 114.149139);
                let mapOptions = {
                  center: latLng,
                  zoom: 22,
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

  startNavigating() {
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
                this.addMarkersToMap(session);

                var geolatlng = [];
                this.geolocation.getCurrentPosition().then((position) => {
                  // let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.latitude);
                  var geolat = position.coords.latitude;
                  var geolng = position.coords.longitude;
                  this.geolat = geolat;
                  this.geolng = geolng;

                  geolatlng.push(this.geolat);
                  geolatlng.push(this.geolng);
                  console.log(geolatlng);

                  let directionsService = new google.maps.DirectionsService;
                  let directionsDisplay = new google.maps.DirectionsRenderer;
  
                  directionsDisplay.setMap(this.map);
                  directionsDisplay.setPanel(this.directionsPanel.nativeElement);
  
                  directionsService.route({
                    // origin: 'adelaide',
                    // destination: 'adelaide oval',
                    // origin: { lat: 22.3364, lng: 114.1989 },
                    origin: { lat: geolat, lng: geolng },
                    destination: { lat: this.session.lat, lng: this.session.lng },
                    travelMode: google.maps.TravelMode['WALKING']
  
                  }, (res, status) => {
                    if (status == google.maps.DirectionsStatus.OK) {
                      directionsDisplay.setDirections(res);
                    } else {
                      console.warn(status);
                    }
  
                  });
                })

           



            

              }
            }
          }
        }
      }
    });


  }

  addMarker() {

    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: this.map.getCenter()
    });

    let content = "<h4>Information!</h4>";

    this.addInfoWindow(marker, content);

  }

  addInfoWindow(marker, content) {

    let infoWindow = new google.maps.InfoWindow({
      content: content
    });

    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(this.map, marker);
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

            // let session = group.sessions;



            // for (var i = 0; i < session.length; i++) {
            //   console.log(session[i].id);

            // } 
            // this.addMarkersToMap(session);
          }

          // for (const session of group.sessions) {
          //   this.session = session;
          //   console.log(this.session);

          //   this.addMarkersToMap(this.session);
          // }
        }

      });
  }


  addMarkersToMap(markers) {
    for (let marker of markers) {
      var icon = {
        url: 'assets/marker/free-8-blue.png', // url
        scaledSize: new google.maps.Size(32, 32), // scaled size

      };

      var position = new google.maps.LatLng(marker.lat, marker.lng);
      var dogwalkMarker = new google.maps.Marker({
        position: position,
        title: marker.name,
        icon: icon
      });
      dogwalkMarker.setMap(this.map);
      this.addInfoWindowToMarker(dogwalkMarker);

    }
  }

  // addMarkersToMap(markers) {
  //   for(let marker of markers) {
  //     var position = new google.maps.LatLng(marker.latitude, marker.longitude);
  //     var dogwalkMarker = new google.maps.Marker({
  //       position: position,
  //       title: marker.name,
  //       icon: 'assets/images/marker.png'});
  //     dogwalkMarker.setMap(this.map);
  //     this.addInfoWindowToMarker(dogwalkMarker);
  //   }
  // }

  // addInfoWindowToMarker(marker) {
  //   var infoWindowContent = '<div id="content"><h1 id="firstHeading" class="firstHeading">' + marker.title + '</h1></div>';
  //   var infoWindow = new google.maps.InfoWindow({
  //     content: infoWindowContent


  //   });
  //   marker.addListener('click', () => {
  //     infoWindow.open(this.map, marker);
  //   });
  // }



  addInfoWindowToMarker(marker) {

    var infoWindowContent = '<div id="content"><h1 id="firstHeading" class="firstHeading">' + marker.title + '</h1>' + '<p id = "myid">Get direction</p></div>';

    var infoWindow = new google.maps.InfoWindow({
      content: infoWindowContent,
      maxWidth: 180,
    });

    google.maps.event.addListenerOnce(infoWindow, 'domready', () => {
      document.getElementById('myid').addEventListener('click', (sessionData: any) => {
        // alert(marker.title);
        this.navCtrl.push(MapdirectionPage, { sessionId: sessionData.id, name: sessionData.name });

      });
    });
    marker.addListener('click', () => {
      this.closeAllInfoWindows();
      infoWindow.open(this.map, marker);
    });

    this.infoWindows.push(infoWindow);

  }

  closeAllInfoWindows() {
    for (let window of this.infoWindows) {
      window.close();
    }
  }

  onRemovePage() {
    this.viewCtrl.dismiss();
  }
}
