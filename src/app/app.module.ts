import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { NgModule, ErrorHandler } from '@angular/core';

import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';

import { InAppBrowser } from '@ionic-native/in-app-browser';
import { SplashScreen } from '@ionic-native/splash-screen';

import { IonicStorageModule } from '@ionic/storage';

import { ConferenceApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { PopoverPage } from '../pages/about-popover/about-popover';
import { AccountPage } from '../pages/account/account';
import { LoginPage } from '../pages/login/login';
import { MapPage } from '../pages/map/map';
import { SchedulePage } from '../pages/schedule/schedule';
import { ScheduleFilterPage } from '../pages/schedule-filter/schedule-filter';
import { SessionDetailPage } from '../pages/session-detail/session-detail';
import { SignupPage } from '../pages/signup/signup';
import { SpeakerDetailPage } from '../pages/speaker-detail/speaker-detail';
import { SpeakerListPage } from '../pages/speaker-list/speaker-list';
import { TabsPage } from '../pages/tabs-page/tabs-page';
import { TutorialPage } from '../pages/tutorial/tutorial';
import { SupportPage } from '../pages/support/support';

import { ConferenceData } from '../providers/conference-data';
import { UserData } from '../providers/user-data';
import { RefernearnPage } from '../pages/refernearn/refernearn';
import { ReservationpagePage } from '../pages/reservationpage/reservationpage';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabase } from "angularfire2/database-deprecated";

// import { AngularFireDatabase } from "angularfire2/database";
import { AngularFireDatabaseModule} from 'angularfire2/database'
import { CommentsService } from '../pages/service/comments.services';
import { ReservationrecordPage } from '../pages/reservationrecord/reservationrecord';
import { SMS } from '@ionic-native/sms';

// import { StatusBar } from '@ionic-native/status-bar';
 
// import { config } from './app.firebaseconfig';
import { AngularFireAuth } from 'angularfire2/auth'; 
// import { MyApp } from './app.component';
import { AuthProvider } from '../providers/auth/auth';
import { UserProvider } from '../providers/user/user';
import { PasswordresetPage } from '../pages/passwordreset/passwordreset';
import { FavouritePage } from '../pages/favourite/favourite';
import { TermandconditionsPage } from '../pages/termandconditions/termandconditions';
import { PrivacypolicyPage } from '../pages/privacypolicy/privacypolicy';
import { LocationmapPage } from '../pages/locationmap/locationmap';
import { CallNumber } from '@ionic-native/call-number';
import { MapdirectionPage } from '../pages/mapdirection/mapdirection';
import { Geolocation } from '@ionic-native/geolocation';
import { SafePipe } from '../pipes/safe/safe';

export const firebaseConfig = {
  apiKey: "AIzaSyCHD1grYSw_D99Db0hfaeX_PEdpXPYg5PI",
  authDomain: "testproject-170706.firebaseapp.com",
  databaseURL: "https://testproject-170706.firebaseio.com",
  projectId: "testproject-170706",
  storageBucket: "testproject-170706.appspot.com",
  messagingSenderId: "265518265966"
};


@NgModule({
  declarations: [
    ConferenceApp,
    AboutPage,
    AccountPage,
    LoginPage,
    MapPage,
    PopoverPage,
    SchedulePage,
    ScheduleFilterPage,
    SessionDetailPage,
    SignupPage,
    SpeakerDetailPage,
    SpeakerListPage,
    TabsPage,
    TutorialPage,
    SupportPage,
    RefernearnPage,
    ReservationpagePage,
    ReservationrecordPage,
    PasswordresetPage,
    FavouritePage,
    TermandconditionsPage,
    PrivacypolicyPage,
    LocationmapPage,
    MapdirectionPage,
    SafePipe
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicStorageModule.forRoot(),
    AngularFireModule.initializeApp(firebaseConfig),
    // AngularFireModule.initializeApp(config),
    
    IonicModule.forRoot(ConferenceApp, {}, {
      links: [
        { component: TabsPage, name: 'TabsPage', segment: 'tabs-page' },
     
        { component: SessionDetailPage, name: 'SessionDetail', segment: 'sessionDetail/:sessionId' },
        { component: ScheduleFilterPage, name: 'ScheduleFilter', segment: 'scheduleFilter' },
       
        { component: SpeakerDetailPage, name: 'SpeakerDetail', segment: 'speakerDetail/:speakerId' },
        { component: MapPage, name: 'Map', segment: 'map' },
      
        { component: AboutPage, name: 'About', segment: 'about' },
        { component: TutorialPage, name: 'Tutorial', segment: 'tutorial' },
        { component: SupportPage, name: 'SupportPage', segment: 'support' },
        { component: LoginPage, name: 'LoginPage', segment: 'login' },
        { component: AccountPage, name: 'AccountPage', segment: 'account' },
        { component: SignupPage, name: 'SignupPage', segment: 'signup' },
        { component: RefernearnPage, name: 'RefernearnPage', segment: 'refernearn' },            
        { component: ReservationpagePage, name: 'ReservationpagePage', segment: 'reservationpage' },            
        { component: ReservationrecordPage, name: 'ReservationrecordPage', segment: 'reservationrecord' },            
        { component: PasswordresetPage, name: 'PasswordresetPage', segment: 'passwordreset' },            
        { component: FavouritePage, name: 'FavouritePage', segment: 'favourite' },            
        { component: TermandconditionsPage, name: 'TermandconditionsPage', segment: 'termandconditions' },            
        { component: PrivacypolicyPage, name: 'PrivacypolicyPage', segment: 'privacypolicy' },            
        { component: LocationmapPage, name: 'LocationmapPage', segment: 'ocationmap' },            
        
      ]
    }),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    ConferenceApp,
    AboutPage,
    AccountPage,
    LoginPage,
    MapPage,
    PopoverPage,
    SchedulePage,
    ScheduleFilterPage,
    SessionDetailPage,
    SignupPage,
    SpeakerDetailPage,
    SpeakerListPage,
    TabsPage,
    TutorialPage,
    SupportPage,
    RefernearnPage,
    ReservationpagePage,
    ReservationrecordPage,
    PasswordresetPage,
    FavouritePage,
    TermandconditionsPage,
    PrivacypolicyPage,
    LocationmapPage,
    MapdirectionPage
  ],
  providers: [
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    ConferenceData,
    UserData,
    InAppBrowser,
    SplashScreen,
    AngularFireDatabase,
    AngularFireDatabaseModule,
    CommentsService,
    SMS,
    AuthProvider,
    AngularFireAuth,
    UserProvider,
    CallNumber,
    Geolocation,
    Storage
  ]
})
export class AppModule { }
