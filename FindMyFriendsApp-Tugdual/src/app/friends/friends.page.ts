import {Component, OnInit} from '@angular/core';
import {AlertController, NavController} from '@ionic/angular';
import {AddFriendsPage} from './add-friends/add-friends.page';

@Component({
    selector: 'app-friends',
    templateUrl: './friends.page.html',
    styleUrls: ['./friends.page.scss'],
})
export class FriendsPage implements OnInit {
    segment = 'groups';

    groupList = [
        {title: 'foot', status: false, members: ['finn', 'rey']},
        {title: 'master 2', status: true, members: ['han', 'luke', 'rey']},
        {title: 'lycée', status: false, members: ['luke']},
    ];

    friendList = [
        {pseudo: 'finn', avatar: 'avatar-finn.png'},
        {pseudo: 'han', avatar: 'avatar-han.png'},
        {pseudo: 'luke', avatar: 'avatar-luke.png'},
        {pseudo: 'rey', avatar: 'avatar-rey.png'},
    ];

    constructor(private nav: NavController,
    ) {
    }

    ngOnInit() {
    }

    segmentChanged(ev) {
    }

    onAddFriend() {
        this.nav.navigateRoot('/add-friends');
    }

    onCreateNewGroup() {
    }

}
