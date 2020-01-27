import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import * as firebase from 'firebase';

@Injectable({
    providedIn: 'root'
})
export class AuthGuardService {

    constructor(private router: Router) {
    }

    canActivate() {
        return new Promise(
            (resolve, reject) => {
                firebase.auth().onAuthStateChanged(
                    (user) => {
                        if (user) {
                            resolve(true);
                        } else {
                            this.router.navigate(['/signin']);
                            resolve(false);
                        }
                    },
                    (error) => {
                        this.router.navigate(['/signin']);
                        reject(error);
                    }
                );
            }
        );
    }
}
