import { Component, OnInit } from '@angular/core';
import {NavController} from '@ionic/angular';

@Component({
  selector: 'app-legal-notice',
  templateUrl: './legal-notice.page.html',
  styleUrls: ['./legal-notice.page.scss'],
})
export class LegalNoticePage implements OnInit {

  constructor(private navCtrl: NavController) { }

  ngOnInit() {
  }

}
