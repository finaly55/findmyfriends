import {AngularFireAuth} from '@angular/fire/auth';
import { Component, OnInit } from '@angular/core';
import {User} from '../../models/user';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  user = {} as User;
  constructor(private afAuth: AngularFireAuth, private router: Router)  { }

  ngOnInit() {
  }
  async register(user: User) {
    try {
      const result = await this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password);
      console.log(result);
    } catch (e) {
      console.error(e);
    }
  }
  return() { this.router.navigateByUrl('/login'); }
}
