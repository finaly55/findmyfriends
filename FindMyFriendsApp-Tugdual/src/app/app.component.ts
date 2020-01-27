import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();

  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      // Initialize firebase
      const firebaseConfig = {
        apiKey: 'AIzaSyAnfIacENGHE0_RTpZWo4HXrLJFecIXFdA',
        authDomain: 'findmyfriends-1920.firebaseapp.com',
        databaseURL: 'https://findmyfriends-1920.firebaseio.com',
        projectId: 'findmyfriends-1920',
        storageBucket: 'findmyfriends-1920.appspot.com',
        messagingSenderId: '851801295768'
      };
      firebase.initializeApp(firebaseConfig);
    });
  }
}
