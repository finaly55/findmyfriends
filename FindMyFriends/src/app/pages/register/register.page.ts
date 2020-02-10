import {AngularFireAuth} from '@angular/fire/auth';
import { Component, OnInit } from '@angular/core';
import {User} from '../../models/user';
import {UserService} from '../../services/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  user = {} as User;
  errorMessage: string;
  constructor(private afAuth: AngularFireAuth, private router: Router, private  userService: UserService)  { }

  ngOnInit() {
  }
  async register(user: User) {
    try {
      const result = await this.userService.createUser(user.email, user.password).then(
          () => {
            this.router.navigate(['']);
          },
          (error) => {
            this.errorMessage = error;
          }
      );
      console.log(result);
    } catch (e) {
      console.error(e);
    }
  }
  return() { this.router.navigateByUrl('/login'); }
}
