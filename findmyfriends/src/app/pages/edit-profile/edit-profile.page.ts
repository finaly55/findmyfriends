import { Component, OnInit } from '@angular/core';
import {User} from '../../models/user';
import {AuthService} from '../../services/auth.service';
import * as firebase from 'firebase';
import {AngularFireAuth} from '@angular/fire/auth';
import { Injectable } from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';
import {Router} from '@angular/router';
import { ToastService } from '../../services/toast.service';

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {
    user = {} as User;
    message: string;
    private db = firebase.firestore();
    constructor(
        private afAuth: AngularFireAuth,
        private authService: AuthService,
        private router: Router,
        public toastService: ToastService
    ) {}
    editProfile(user: User) {
        this.message = 'Profil mis à jour';
        try {
            this.db.collection('users').doc(this.user.uid)
                .update({
                    email: user.email,
                    lastName: user.lastName,
                    firstName: user.firstName,
                    phoneNumber: user.phoneNumber,
              }).then(() => {
                this.toastService.presentToast(this.message);
            });
        } catch (e) {
          console.error(e);
        }
    }
    ngOnInit() {
        try {
            this.afAuth.authState.subscribe(auth => {
                if (!auth) {
                    this.message = 'Merci de vous identifier';
                    this.router.navigateByUrl('/login')
                        .then(() => {
                            this.toastService.presentToast(this.message);
                        });
                } else {
                    this.afAuth.auth.onAuthStateChanged((user) => {
                        if (user) {
                            this.user.uid = user.uid;
                            this.db.collection('users').doc(this.user.uid).get()
                                .then((value) => {
                                    this.user.lastName = value.data().lastName;
                                    this.user.firstName = value.data().firstName;
                                    this.user.email = user.email;
                                    this.user.phoneNumber = value.data().phoneNumber;
                                });
                        }
                    });
                }
            });
        } catch (e) {
            console.error(e);
        }
    }
}
