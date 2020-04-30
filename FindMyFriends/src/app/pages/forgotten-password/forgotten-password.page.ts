import {AngularFireAuth} from '@angular/fire/auth';
import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {FormControl, Validators} from '@angular/forms';
import {NavController} from '@ionic/angular';

@Component({
    selector: 'app-forgotten-password',
    templateUrl: './forgotten-password.page.html',
    styleUrls: ['./forgotten-password.page.scss'],
})
export class ForgottenPasswordPage {
    emailControl = new FormControl('', [Validators.required, Validators.email]);

    constructor(private afAuth: AngularFireAuth,
                private navCtrl: NavController,
                private router: Router) {
    }

    resetPassword() {
        if (this.emailControl.valid) {
            this.afAuth.auth.sendPasswordResetEmail(this.emailControl.value).then(() => {
                /*todo: show 'Email to reset pasword send'*/
                this.router.navigate(['/login']);
            });
        }
    }
}





