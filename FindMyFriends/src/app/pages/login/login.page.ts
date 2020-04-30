import {AngularFireAuth} from '@angular/fire/auth';
import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {User} from '../../core/models/user';
import {AuthService} from '../../core/services/auth.service';


@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage {

    user = {} as User;
    errorMessage = '';

    constructor(private afAuth: AngularFireAuth,
                private authService: AuthService,
                private router: Router) {
    }

    login(user: User) {
        this.authService.signInUser(user.email, user.password).then(
            () => {
                this.router.navigate(['/tabs']);
            },
            (error) => {
                this.errorMessage = error;
            }
        );
    }

    register() {
        this.router.navigateByUrl('/register');
    }


    forgettenPassword() {
        this.router.navigateByUrl('/forgotten-password');
    }
}
