import {Component} from '@angular/core';

import {Platform} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';
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
        private statusBar: StatusBar,
    ) {
        this.initializeApp();
    }

    initializeApp() {
        this.platform.ready().then(() => {
            this.statusBar.styleDefault();
            this.splashScreen.hide();

            const firebaseConfig = {
                apiKey: 'AIzaSyAP7cm61M3UhYEmwVmPC8Ha3jHUGEAuSFw',
                authDomain: 'findmyfriends-1.firebaseapp.com',
                databaseURL: 'https://findmyfriends-1.firebaseio.com',
                projectId: 'findmyfriends-1',
                storageBucket: 'findmyfriends-1.appspot.com',
                measurementId: 'G-8FJH5DR4XJ'
            };
            firebase.initializeApp(firebaseConfig);
        });
    }
}
