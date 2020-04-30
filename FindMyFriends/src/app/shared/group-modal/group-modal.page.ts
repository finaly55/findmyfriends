import {Component, OnInit} from '@angular/core';
import {AlertController, ModalController} from '@ionic/angular';
import * as firebase from 'firebase';
import {Group} from '../../core/models/group';
import {Friend} from '../../core/models/friend';
import {forEach} from '@angular-devkit/schematics';

@Component({
    selector: 'app-group-modal',
    templateUrl: './group-modal.page.html',
    styleUrls: ['./group-modal.page.scss'],
})
export class GroupModalPage implements OnInit {
    name: string;
    query: string;
    friends: Friend[];
    friendsGroup: Friend[] = [];
    group: Group;

    constructor(private modalCtrl: ModalController,
                private alertController: AlertController) {
    }

    ngOnInit(): void {
        if (this.group) {
            this.friendsGroup = this.group.members;
            if (this.group) {
                this.name = this.group.name;
                this.friends.forEach((f: Friend) => {
                    this.group.members.forEach(m => {
                        if (m.email === f.email) {
                            this.friends.splice(this.friends.indexOf(f));
                        }
                    });
                });
            }
        }
    }

    addFriendToGroup(friend: Friend) {
        this.friendsGroup.push(friend);
        const index = this.friends.indexOf(friend);
        if (index > -1) {
            this.friends.splice(index, 1);
        }
    }

    removeFriendToGroup(friend: Friend) {
        this.friends.push(friend);
        const index = this.friendsGroup.indexOf(friend);
        if (index > -1) {
            this.friendsGroup.splice(index, 1);
        }
    }

    createGroup() {
        if (this.friendsGroup.length > 0) {
            const group = {
                name: this.name,
                members: this.friendsGroup
            };
            this.modalCtrl.dismiss(group);
        } else {
            this.presentAlert();
        }
    }

    async presentAlert() {
        const alert = await this.alertController.create({
            header: 'Attention',
            message: 'Un groupe doit contenir au moins une personne.',
            buttons: ['OK']
        });

        await alert.present();
    }

    dismissModal() {
        this.modalCtrl.dismiss();
    }

}
