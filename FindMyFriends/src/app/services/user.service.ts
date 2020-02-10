import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  createUser(email: string, password: string) {
    return new Promise(
        (resolve, reject) => {
          firebase.auth().createUserWithEmailAndPassword(email, password).then(
              (userCreated) => {
                resolve(firebase.firestore().collection('users').doc(userCreated.user.uid).set({
                  email: userCreated.user.email,
                }));
              },
              (err) => {
                reject(err);
              }
          );
        }
    );
  }
}
