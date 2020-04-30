import {Injectable} from '@angular/core';
import * as firebase from 'firebase';
import {User} from '../models/user';
import {Router} from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(private router: Router) {
    }

    createUser(user: User) {
        return new Promise(
            (resolve, reject) => {
                firebase.auth().createUserWithEmailAndPassword(user.email, user.password).then(
                    (userCreated) => {
                        resolve(firebase.firestore().collection('users').doc(userCreated.user.uid).set({
                            email: userCreated.user.email,
                            lastName: user.lastName,
                            firstName: user.firstName,
                            phoneNumber: user.phoneNumber
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

    signOutUser() {
        console.log('sign out');
        firebase.auth().signOut().then(() => {
            this.router.navigate(['/tabs']);
        });
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

    getCurrentUser() {
        return firebase.auth().currentUser;
    }
}
