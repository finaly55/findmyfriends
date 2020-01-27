import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.page.html',
    styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

    signupForm: FormGroup;
    errorMessage: string;

    constructor(private formBuilder: FormBuilder,
                private  authService: AuthService,
                private router: Router) {
    }

    ngOnInit() {
        this.initForm();
    }

    initForm() {
        this.signupForm = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]]
        });
    }

    onsubmit() {
        const email = this.signupForm.get('email').value;
        const password = this.signupForm.get('password').value;

        this.authService.createNewUser(email, password).then(
            () => {
                this.router.navigate(['']);
            },
            (error) => {
                this.errorMessage = error;
            }
        );
    }

}
