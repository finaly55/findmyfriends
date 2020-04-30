import {Component, OnInit} from '@angular/core';
import * as firebase from 'firebase';
import {firestore} from 'firebase';
import {AlertController, ModalController} from '@ionic/angular';
import {GroupModalPage} from '../../shared/group-modal/group-modal.page';
import {FirebaseService} from '../../core/services/firebase.service';
import {Group} from '../../core/models/group';
import {Friend} from '../../core/models/friend';

@Component({
    selector: 'app-groups',
    templateUrl: './groups.page.html',
    styleUrls: ['./groups.page.scss'],
})
export class GroupsPage implements OnInit {
    category = 'groups';
    uid: string;
    query: string;
    friends: Friend[];
    groups: Group[];
    selectedGroup: Group;
    searchFriendsResult: object[];
    editFriends = false;
    editGroups = false;

    constructor(public alertController: AlertController,
                private firebaseService: FirebaseService,
                public modalController: ModalController) {
        this.uid = firebase.auth().currentUser.uid;
    }

    ngOnInit() {
        this.getFriendsAndGroups();
    }

    getFriendsAndGroups() {
        this.firebaseService.get('users', this.uid).then((res: any) => {
            this.friends = res.data().friends || [];
            this.groups = res.data().groups || [];
            this.selectedGroup = res.data().activeGroup || [];
        });
    }

    searchFriends() {
        this.searchFriendsResult = [];
        const regex = RegExp('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$');

        if (regex.test(this.query)) {
            firebase.firestore().collection('users')
                .where('email', '==', this.query)
                .get()
                .then(snapshot => {
                    snapshot.forEach(doc => {
                        this.searchFriendsResult.push({...doc.data(), uid: doc.id});
                    });
                });
        } else {
            /*todo: show toast */
        }
    }

    async addFriend(friend) {
        const alert = await this.alertController.create({
            header: 'Nouvel ami',
            message: 'Voulez-vous ajouter ' + friend.firstName + ' ' + friend.lastName + ' a vos amis ?',
            buttons: [
                {
                    text: 'Non',
                    role: 'cancel',
                    cssClass: 'cancel-button'
                }, {
                    text: 'Oui',
                    handler: () => {
                        /*todo: check if already friend together*/
                        const friendData = {
                            uid: friend.uid,
                            name: friend.firstName + ' ' + friend.lastName,
                            email: friend.email,
                            coords: friend.coords || {}
                        };
                        this.friends.push(friendData);
                        this.firebaseService.update('users', this.uid, {friends: this.friends});
                    }
                }
            ]
        });

        await alert.present();
    }

    async deleteFriend(friend) {
        const alert = await this.alertController.create({
            header: 'Supprimer',
            message: 'Etes-vous certain de vouloir supprimer ' + friend.firstName + ' ' + friend.lastName + ' de vos amis ?',
            buttons: [
                {
                    text: 'Non',
                    role: 'cancel',
                    cssClass: 'cancel-button'
                }, {
                    text: 'Oui',
                    handler: () => {
                        const index = this.friends.indexOf(friend);
                        if (index > -1) {
                            this.friends.splice(index, 1);
                        }
                        this.firebaseService.update('users', this.uid, {friends: this.friends});
                    }
                }
            ]
        });
        await alert.present();
    }

    async addGroup() {
        const modal = await this.modalController.create({
            component: GroupModalPage,
            componentProps: {
                title: 'Créer un groupe',
                friends: this.friends
            }
        });
        modal.onDidDismiss().then(response => {
            if (response.data) {
                this.groups.push(response.data);
                this.firebaseService.update('users', this.uid, {groups: this.groups});
            }
        });
        return await modal.present();
    }

    async editGroup(group: Group) {
        const modal = await this.modalController.create({
            component: GroupModalPage,
            componentProps: {
                title: 'Modifier le groupe : ' + group.name,
                friends: this.friends,
                group
            }
        });
        modal.onDidDismiss().then(response => {
            if (response.data) {
                console.log(response);
            }
        });
        return await modal.present();
    }

    async activeGroup(group: Group) {
        const alert = await this.alertController.create({
            header: 'Supprimer',
            message: 'Etes-vous certain de vouloir activer le groupe : ' + group.name + ' ?',
            buttons: [
                {
                    text: 'Non',
                    role: 'cancel',
                    cssClass: 'cancel-button'
                }, {
                    text: 'Oui',
                    handler: () => {
                        this.selectedGroup = group;
                        this.firebaseService.update('users', this.uid, {activeGroup: group});
                    }
                }
            ]
        });
        await alert.present();
    }

    async deleteGroup(group: Group) {
        const alert = await this.alertController.create({
            message: 'Etes-vous certain de vouloir quitter le groupe : ' + group.name,
            buttons: [
                {
                    text: 'Non',
                    role: 'cancel',
                    cssClass: 'cancel-button'
                }, {
                    text: 'Oui',
                    handler: () => {
                        const index = this.groups.indexOf(group);
                        if (index > -1) {
                            this.groups.splice(index, 1);
                        }
                        this.firebaseService.update('users', this.uid, {groups: this.groups});
                    }
                }
            ]
        });

        await alert.present();
    }

}
