import {Injectable} from '@angular/core';
import * as firebase from 'firebase';
import {error} from 'util';
import {UserModel} from '../models/user.model';
import {UserService} from './user.service';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor() {
    }

    createNewUser(email: string, password: string) {
        return new Promise(
            (resolve, reject) => {
                firebase.auth().createUserWithEmailAndPassword(email, password).then(
                    (userCreated) => {
                        resolve(firebase.firestore().collection('users').doc(userCreated.user.uid).set({
                            email: userCreated.user.email,
                            pseudo: '',
                            phone: ''
                        }));
                    },
                    (err) => {
                        reject(err);
                    }
                );
            }
        );
    }

    signInUser(email: string, password: string) {
        return new Promise(
            (resolve, reject) => {
                firebase.auth().signInWithEmailAndPassword(email, password).then(
                    () => {
                        resolve();
                    },
                    (err) => {
                        reject(err);
                    }
                );
            }
        );
    }

    signInGoogleUser() {
        return new Promise(
            (resolve, reject) => {
                firebase.auth().signInWithPopup(
                    new firebase.auth.GoogleAuthProvider()
                ).then(
                    () => {
                        resolve();
                    },
                    (err) => {
                        reject(err);
                    }
                );
            }
        );
    }

    signOutUser() {
        firebase.auth().signOut();
    }

    resetPasswordInit(email: string) {
        return firebase.auth().sendPasswordResetEmail(
            'launay.tug@gmail.com',
            {url: 'https://findmyfriends-1920.firebaseapp.com/__/auth/action'}
        );
    }

    deleteUser() {
        return new Promise(
            (resolve, reject) => {
                firebase.auth().currentUser.delete().then(
                    () => {
                        resolve();
                        /*todo: delete user info & position & group list*/
                    },
                    (err) => {
                        reject(err);
                    }
                );
            }
        );
    }

}
