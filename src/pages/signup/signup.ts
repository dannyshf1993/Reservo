import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { NavController } from 'ionic-angular';

import { UserData } from '../../providers/user-data';

import { UserOptions } from '../../interfaces/user-options';

import { TabsPage } from '../tabs-page/tabs-page';


@Component({
  selector: 'page-user',
  templateUrl: 'signup.html'
})
export class SignupPage {
  signup: UserOptions = { username: '', password: '' };
  submitted = false;

  constructor(public navCtrl: NavController, public userData: UserData) {}

  onSignup(form: NgForm) {
    this.submitted = true;

    if (form.valid) {
      this.userData.signup(this.signup.username);
      this.navCtrl.push(TabsPage);
    }
  }
}


// import { Component } from '@angular/core';
// import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
// import { UserProvider } from '../../providers/user/user';
// import { SchedulePage } from '../schedule/schedule';
// import { LoginPage } from '../login/login';
// /**
//  * Generated class for the SignupPage page.
//  *
//  * See http://ionicframework.com/docs/components/#navigation for more info
//  * on Ionic pages and navigation.
//  */
// @IonicPage()
// @Component({
//   selector: 'page-signup',
//   templateUrl: 'signup.html',
// })
// export class SignupPage {
//   newuser = {
//     email: '',
//     password: '',
//     displayName: ''
//   }
//   constructor(public navCtrl: NavController, public navParams: NavParams, public userservice: UserProvider,
//               public loadingCtrl: LoadingController, public toastCtrl: ToastController) {
//   }

//   signup() {
//     var toaster = this.toastCtrl.create({
//       duration: 3000,
//       position: 'bottom'
//     });
//     if (this.newuser.email == '' || this.newuser.password == '' || this.newuser.displayName == '') {
//       toaster.setMessage('All fields are required dude');
//       toaster.present();
//     }
//     else if (this.newuser.password.length < 7) {
//       toaster.setMessage('Password is not strong. Try giving more than six characters');
//       toaster.present();
//     }
//     else {
//       let loader = this.loadingCtrl.create({
//         content: 'Please wait'
//       });
//       loader.present();
//       this.userservice.adduser(this.newuser).then((res: any) => {
//         loader.dismiss();
//         if (res.success)
//           this.navCtrl.push(SchedulePage);
//           // this.navCtrl.push('ProfilepicPage');
//           else
//           alert('Error' + res);
//       })
//     }
//   }  

//   goback() {
//     this.navCtrl.setRoot(LoginPage);
//   }

// }


