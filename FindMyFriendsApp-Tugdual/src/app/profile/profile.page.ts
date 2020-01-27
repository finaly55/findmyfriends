import {Component, OnInit} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {AlertController, NavController, ToastController} from '@ionic/angular';
import * as firebase from 'firebase';
import {UserService} from '../services/user.service';
import {UserModel} from '../models/user.model';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.page.html',
    styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
    user: UserModel = new UserModel('', '', '');

    constructor(private authService: AuthService,
                private userService: UserService,
                private toastController: ToastController,
                private navCtrl: NavController,
                private alertController: AlertController) {
    }

    ngOnInit() {
        this.getUser();
    }

    getUser() {
        this.userService.getUser(firebase.auth().currentUser.uid).then((user: UserModel) => {
            this.user = user;
        });
    }

    updateUser() {
        this.userService.updateUser(this.user, firebase.auth().currentUser.uid).then(
            () => {
                this.presentToast('Votre profile a été mise à jour !');
            },
            (err) => {
                console.error(err);
            }
        );
    }

    goToLegalPage() {
        this.navCtrl.navigateForward('legal');
    }

    onSignOut() {
        this.authService.signOutUser();
    }

    async onDeleteUser() {
        const alert = await this.alertController.create({
            header: 'Confirmation !',
            message: 'Voulez-vous supprimer votre compte ?',
            buttons: [
                {
                    text: 'Non',
                    role: 'cancel',
                    cssClass: 'secondary',
                },
                {
                    text: 'Oui',
                    handler: () => {
                        this.authService.deleteUser();
                        this.authService.signOutUser();
                    }
                }
            ]
        });
        await alert.present();
    }

    async presentToast(msg: string) {
        const toast = await this.toastController.create({
            message: msg,
            duration: 2000,
            buttons: [
                {
                    text: 'Ok',
                    role: 'cancel'
                }
            ]
        });
        toast.present();
    }

}
