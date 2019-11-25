import {AngularFireAuth} from '@angular/fire/auth';
import { Component, OnInit } from '@angular/core';
import {User} from '../../models/user';

@Component({
  selector: 'app-forgotten-password',
  templateUrl: './forgotten-password.page.html',
  styleUrls: ['./forgotten-password.page.scss'],
})
export class ForgottenPasswordPage implements OnInit {

  user = {} as User;
  constructor(private afAuth: AngularFireAuth) { }

  ngOnInit() {
  }
  resetPassword(user: User) {
    this.afAuth.auth.sendPasswordResetEmail(user.email);
  }
}
