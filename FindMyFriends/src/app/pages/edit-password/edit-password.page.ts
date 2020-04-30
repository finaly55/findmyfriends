import {Component, OnInit} from '@angular/core';
import * as firebase from 'firebase';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NavController} from '@ionic/angular';

@Component({
    selector: 'app-edit-password',
    templateUrl: './edit-password.page.html',
    styleUrls: ['./edit-password.page.scss'],
})
export class EditPasswordPage implements OnInit {
    updatePasswordForm: FormGroup;
    errorMessage = ' ';

    constructor(private formBuilder: FormBuilder,
                private navCtrl: NavController) {
    }

    ngOnInit() {
        this.updatePasswordForm = this.formBuilder.group({
            password: ['', [Validators.required, Validators.minLength(6)]],
            checkPassword: ['', [Validators.required, Validators.minLength(6)]]
        });
    }

    updatePassword(form) {
        this.errorMessage = ' ';

        if (form.valid && form.password === form.password) {
            firebase.auth().currentUser.updatePassword(form.password).then(res => {
                this.updatePasswordForm.reset();
                /*todo: toast*/
            }).catch(error => {
                console.log(error);
            });
        } else {
            this.errorMessage = 'Les mot de passe doivent correspondres';
        }
    }
}
