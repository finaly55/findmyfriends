import {Component, OnInit} from '@angular/core';
import {NavController} from '@ionic/angular';

@Component({
    selector: 'app-add-friends',
    templateUrl: './add-friends.page.html',
    styleUrls: ['./add-friends.page.scss'],
})
export class AddFriendsPage implements OnInit {

    constructor(private navCtrl: NavController) {
    }

    ngOnInit() {
    }

    goBack() {
        this.navCtrl.navigateBack('/tabs/friends');
    }

}
