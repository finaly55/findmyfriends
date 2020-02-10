import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  logout() { this.router.navigateByUrl('/login'); }

  editPassword(){
    this.router.navigateByUrl('/dashboard/edit-password')
  }
  termsOfUse(){
    this.router.navigateByUrl('/dashboard/terms-of-use')
  }
  legalNotice(){
    this.router.navigateByUrl('/dashboard/legal-notice')
  }

}
