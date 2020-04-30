import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';

import {IonicModule, IonicRouteStrategy} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {AngularFireModule} from '@angular/fire';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {environment} from '../environments/environment';
import {Geolocation} from '@ionic-native/geolocation/ngx';
import {HeaderLogoComponent} from './communs/header-logo/header-logo.component';
import {GroupModalPage} from './shared/group-modal/group-modal.page';
import {GroupModalPageModule} from './shared/group-modal/group-modal.module';

@NgModule({
    declarations: [AppComponent, HeaderLogoComponent],
    entryComponents: [GroupModalPage],
    imports: [
        BrowserModule,
        IonicModule.forRoot(),
        AppRoutingModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule, AngularFireAuthModule,
        GroupModalPageModule
    ],
    providers: [
        StatusBar,
        Geolocation,
        SplashScreen,
        {provide: RouteReuseStrategy, useClass: IonicRouteStrategy}
    ],
    exports: [
        HeaderLogoComponent
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
