import {Injectable} from '@angular/core';
import * as firebase from 'firebase';

@Injectable({
    providedIn: 'root'
})
export class FirebaseService {

    constructor() {
    }

    get(collection, doc) {
        return new Promise(
            (resolve, reject) => {
                firebase.firestore().collection(collection).doc(doc).get()
                    .then(
                        res => {
                            resolve(res);
                        },
                        err => {
                            reject(err);
                        }
                    );
            });
    }

    update(collection, doc, data) {
        return new Promise(
            (resolve, reject) => {
                firebase.firestore().collection(collection).doc(doc)
                    .update(data)
                    .then(
                        res => {
                            console.log(res);
                        },
                        err => {
                            reject(err);
                        }
                    );
            }
        );
    }

    delete() {

    }
}
