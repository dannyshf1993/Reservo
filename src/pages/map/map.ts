import { Component, ElementRef, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { ConferenceData } from '../../providers/conference-data';

import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';

declare var google: any;
@Injectable()
@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})
export class MapPage {
  @ViewChild('mapContainer') mapContainer: ElementRef;
  
    session: any;
    map: any;
    infoWindows: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public http: Http,
    public viewCtrl: ViewController,
    public dataProvider: ConferenceData,
    public platform: Platform,
  ) {
    this.infoWindows = [];
  }

  ionViewWillEnter() {
    this.displayGoogleMap();
    this.getMarkers();

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
                console.log('it works!');

                console.log(this.session.name);
                console.log(this.session.lat);
                console.log(this.session.lng);

                let latLng = new google.maps.LatLng(22.3964, 114.1095);

                // let latLng = new google.maps.LatLng(22.286394, 114.149139);
                let mapOptions = {
                  center: latLng,
                  zoom: 5,
                  mapTypeId: google.maps.MapTypeId.ROADMAP,
                  styles: [
                    { elementType: 'geometry', stylers: [{ color: '#242f3e' }] },
                    { elementType: 'labels.text.stroke', stylers: [{ color: '#242f3e' }] },
                    { elementType: 'labels.text.fill', stylers: [{ color: '#746855' }] },
                    {
                      featureType: 'administrative.locality',
                      elementType: 'labels.text.fill',
                      stylers: [{ color: '#d59563' }]
                    },
                    {
                      featureType: 'poi',
                      elementType: 'labels.text.fill',
                      stylers: [{ color: '#d59563' }]
                    },
                    {
                      featureType: 'poi.park',
                      elementType: 'geometry',
                      stylers: [{ color: '#263c3f' }]
                    },
                    {
                      featureType: 'poi.park',
                      elementType: 'labels.text.fill',
                      stylers: [{ color: '#6b9a76' }]
                    },
                    {
                      featureType: 'road',
                      elementType: 'geometry',
                      stylers: [{ color: '#38414e' }]
                    },
                    {
                      featureType: 'road',
                      elementType: 'geometry.stroke',
                      stylers: [{ color: '#212a37' }]
                    },
                    {
                      featureType: 'road',
                      elementType: 'labels.text.fill',
                      stylers: [{ color: '#9ca5b3' }]
                    },
                    {
                      featureType: 'road.highway',
                      elementType: 'geometry',
                      stylers: [{ color: '#746855' }]
                    },
                    {
                      featureType: 'road.highway',
                      elementType: 'geometry.stroke',
                      stylers: [{ color: '#1f2835' }]
                    },
                    {
                      featureType: 'road.highway',
                      elementType: 'labels.text.fill',
                      stylers: [{ color: '#f3d19c' }]
                    },
                    {
                      featureType: 'transit',
                      elementType: 'geometry',
                      stylers: [{ color: '#2f3948' }]
                    },
                    {
                      featureType: 'transit.station',
                      elementType: 'labels.text.fill',
                      stylers: [{ color: '#d59563' }]
                    },
                    {
                      featureType: 'water',
                      elementType: 'geometry',
                      stylers: [{ color: '#17263c' }]
                    },
                    {
                      featureType: 'water',
                      elementType: 'labels.text.fill',
                      stylers: [{ color: '#515c6d' }]
                    },
                    {
                      featureType: 'water',
                      elementType: 'labels.text.stroke',
                      stylers: [{ color: '#17263c' }]
                    }
                  ]

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
        icon: icon
      });
      dogwalkMarker.setMap(this.map);
      this.addInfoWindowToMarker(dogwalkMarker);

    }
  }

 

  addInfoWindowToMarker(marker) {
    
    var infoWindowContent = '<div id="content"><h1 id="firstHeading" class="firstHeading">' + marker.title + '</h1>' + '<button onclick="myFunction()">Click here for direction</button></div>';

    var infoWindow = new google.maps.InfoWindow({
      content: infoWindowContent,
      maxWidth: 180,
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



  
}
