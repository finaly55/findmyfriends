import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  createUser(email: string, password: string, lastName: string, firstName: string, phoneNumber: string) {
      return new Promise(
          (resolve, reject) => {
              firebase.auth().createUserWithEmailAndPassword(email, password).then(
                  (userCreated) => {
                      resolve(firebase.firestore().collection('users').doc(userCreated.user.uid).set({
                          email: userCreated.user.email,
                          lastName: lastName,
                          firstName: firstName,
                          phoneNumber: phoneNumber
                      }));
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
