import {AngularFireAuth} from '@angular/fire/auth';
import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {User} from '../../models/user';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  user = {} as User;
  constructor(private afAuth: AngularFireAuth, private router: Router) {
  }
  ngOnInit() {}
  async login(user: User) {
    try {
      const result = await this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password);
      if (result) {
        this.router.navigateByUrl('/home');
      }
    } catch (e) {
      console.error(e);
    }
  }
  register() { this.router.navigateByUrl('/register'); }

  logout() {
    this.afAuth.auth.signOut().then(() => { this.router.navigateByUrl('/login'); });
  }
}
