import {AngularFireAuth} from '@angular/fire/auth';
import {Component, OnInit} from '@angular/core';
import {User} from '../../core/models/user';
import {Router} from '@angular/router';
import {AuthService} from '../../core/services/auth.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NavController} from '@ionic/angular';

@Component({
    selector: 'app-register',
    templateUrl: './register.page.html',
    styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

    user = {} as User;
    registerForm: FormGroup;
    errorMsg: string;

    constructor(private  authService: AuthService,
                private navCtrl: NavController,
                private formBuilder: FormBuilder,
                private router: Router) {
    }

    ngOnInit() {
        this.initForm();
    }

    initForm() {
        this.registerForm = this.formBuilder.group({
            lastName: ['', Validators.required],
            firstName: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            phoneNumber: ['', [Validators.required, Validators.minLength(10)]],
            password: ['', [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/), Validators.minLength(6)]],
            c_password: ['', [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/), Validators.minLength(6)]]
        });
    }

    async registerUser(user: User) {
        this.errorMsg = '';

        if (user.password !== this.registerForm.value.c_password) {
            this.errorMsg = 'Les mot de passe doivent correspondres';
            return;
        }

        this.authService.createUser(user).then(
            res => {
                /*todo: alert account create*/
                this.router.navigate(['/login']);
            },
            (error) => {
                /*todo: alert account not create*/
                this.errorMsg = error.message;
            }
        );
    }
}
