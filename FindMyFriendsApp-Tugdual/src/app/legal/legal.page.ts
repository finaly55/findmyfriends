import {Component, OnInit} from '@angular/core';
import {NavController} from '@ionic/angular';

@Component({
    selector: 'app-legal',
    templateUrl: './legal.page.html',
    styleUrls: ['./legal.page.scss'],
})
export class LegalPage implements OnInit {

    constructor(private navCtrl: NavController) {
    }

    ngOnInit() {
    }

    goBack() {
        this.navCtrl.navigateBack('/tabs/profile');
    }

}
