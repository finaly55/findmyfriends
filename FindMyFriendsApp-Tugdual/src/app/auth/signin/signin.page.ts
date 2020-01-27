import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Subject} from 'rxjs';
import * as firebase from 'firebase';

@Component({
    selector: 'app-signin',
    templateUrl: './signin.page.html',
    styleUrls: ['./signin.page.scss'],
})
export class SigninPage implements OnInit {

    signinForm: FormGroup;
    errorMessage: string;

    constructor(private formBuilder: FormBuilder,
                private authService: AuthService,
                private activatedRoute: ActivatedRoute,
                private router: Router) {
    }

    ngOnInit() {
        this.initForm();
    }

    initForm() {
        this.signinForm = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]]
        });
    }

    onsubmit() {
        const email = this.signinForm.get('email').value;
        const password = this.signinForm.get('password').value;

        this.authService.signInUser(email, password).then(
            () => {
                this.router.navigate(['/tabs']);
            },
            (error) => {
                this.errorMessage = error;
            }
        );
    }

    onGoogleSubmit() {
        this.authService.signInGoogleUser().then(
            () => {
                this.router.navigate(['/tabs']);
            },
            (error) => {
                this.errorMessage = error;
            }
        );
    }

    resetPassword(email: string) {
        this.authService.resetPasswordInit(email).then(
            () => {
                console.info('A password reset link has been sent to your email address');
            },
            (err) => {
                console.error(err);
            }
        );
    }
}
