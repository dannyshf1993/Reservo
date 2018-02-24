import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { NavController } from 'ionic-angular';

import { UserData } from '../../providers/user-data';

import { UserOptions } from '../../interfaces/user-options';

import { TabsPage } from '../tabs-page/tabs-page';
import { SignupPage } from '../signup/signup';


@Component({
  selector: 'page-user',
  templateUrl: 'login.html'
})
export class LoginPage {
  login: UserOptions = { username: '', password: '' };
  submitted = false;

  constructor(public navCtrl: NavController, public userData: UserData) { }

  onLogin(form: NgForm) {
    this.submitted = true;

    if (form.valid) {
      this.userData.login(this.login.username);
      this.navCtrl.push(TabsPage);
    }
  }

  onSignup() {
    this.navCtrl.push(SignupPage);
  }
}


// import { Component } from '@angular/core';
// import { IonicPage, NavController, NavParams } from 'ionic-angular';

// import { usercreds } from '../../models/interfaces/usercreds';

// import { AuthProvider } from '../../providers/auth/auth';
// import { ToastController } from 'ionic-angular';

// /**
//  * Generated class for the LoginPage page.
//  *
//  * See http://ionicframework.com/docs/components/#navigation for more info
//  * on Ionic pages and navigation.
//  */
// @IonicPage()
// @Component({
//   selector: 'page-login',
//   templateUrl: 'login.html',
// })
// export class LoginPage {
//   credentials = {} as usercreds;
//   submitted = false;

//   constructor(
//     public navCtrl: NavController, 
//     public navParams: NavParams, 
//     public authservice: AuthProvider,
//   private toastCtrl: ToastController
//   ) {
//   }

//   ionViewDidLoad() {
//     console.log('ionViewDidLoad LoginPage');
//   }

//   signin() {
//     this.submitted = true;

//     this.authservice.login(this.credentials).then((res: any) => {
//       if (!res.code)
//         this.navCtrl.setRoot('TabsPage'),
//         this.presentToast();
//       else
//         alert(res);
        
//     })
//   }

//   signup() {
//     this.navCtrl.push('SignupPage');
//   }

//   passwordreset() {
//     this.navCtrl.push('PasswordresetPage');
//   }

//   presentToast() {
//     let toast = this.toastCtrl.create({
//       message: 'Welcome back!' ,
//       duration: 3000,
//       position: 'middle',
//       cssClass: 'alertDanger'
//     });
  
//     toast.onDidDismiss(() => {
//       console.log('Dismissed toast');
//     });
  
//     toast.present();
//   }
// }




