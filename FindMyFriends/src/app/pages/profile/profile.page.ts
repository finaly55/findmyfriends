import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AngularFireAuth} from '@angular/fire/auth';
import {AuthService} from '../../core/services/auth.service';
import {ToastService} from '../../core/services/toast.service';
import {User} from '../../core/models/user';
import * as firebase from 'firebase';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AlertController} from '@ionic/angular';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.page.html',
    styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
    user = {} as User;
    private db = firebase.firestore();
    userProfileForm: FormGroup;

    constructor(
        private formBuilder: FormBuilder,
        private alertController: AlertController,
        private afAuth: AngularFireAuth,
        private authService: AuthService,
        private router: Router,
        public toastService: ToastService
    ) {
    }

    ngOnInit() {
        this.getUserProfile();
    }

    goTo() {
        this.router.navigate(['/tabs/legal-notice']);
    }
    getUserProfile() {
        this.afAuth.auth.onAuthStateChanged((user) => {
            if (user) {
                this.user.uid = user.uid;

                this.db.collection('users').doc(this.user.uid).get()
                    .then((value) => {
                        this.userProfileForm = this.formBuilder.group({
                            lastName: [value.data().lastName, Validators.required],
                            firstName: [value.data().firstName, Validators.required],
                            email: [value.data().email, [Validators.required, Validators.email]],
                            phoneNumber: [value.data().phoneNumber, [Validators.required, Validators.minLength(10)]]
                        });
                    });
            }
        });
    }

    updateUserProfile(user: User) {
        this.db.collection('users').doc(this.user.uid)
            .update({
                email: user.email,
                lastName: user.lastName,
                firstName: user.firstName,
                phoneNumber: user.phoneNumber,
            })
            .then(() => {
                firebase.auth().currentUser.updateEmail(user.email).then(() => {
                    this.toastService.presentToast('Profil mis à jour');
                });
            })
            .catch(e => {
                console.log(e);
            });
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
}
