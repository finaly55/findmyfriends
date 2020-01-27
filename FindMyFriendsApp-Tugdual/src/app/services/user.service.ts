import {Injectable} from '@angular/core';
import {UserModel} from '../models/user.model';
import * as firebase from 'firebase';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor() {
    }

    updateUser(user: UserModel, uid) {
        return new Promise(
            (resolve, reject) => {
                firebase.firestore().collection('users').doc(uid)
                    .set({
                        email: user.email,
                        pseudo: user.pseudo,
                        phone: user.phone
                    })
                    .then(
                        () => {
                            resolve();
                        },
                        (err) => {
                            reject(err);
                        }
                    );
            });
    }

    getUser(userId: string) {
        const usersRef = firebase.firestore().collection('users').doc(userId);

        return new Promise(
            (resolve, reject) => {
                usersRef.get().then(
                    doc => {
                        resolve(doc.data());
                    }, error => {
                        reject(error);
                    });
            });

    }

    removeUser(userId: string) {
        return firebase.firestore().doc('users/' + userId).delete();
    }
}
