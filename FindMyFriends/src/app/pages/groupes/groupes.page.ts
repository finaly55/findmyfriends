import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-groupes',
  templateUrl: './groupes.page.html',
  styleUrls: ['./groupes.page.scss'],
})
export class GroupesPage implements OnInit {
  category = "groupes";

  constructor() { }

  ngOnInit() {
  }

  segmentChanged(event) {
    this.category = event;
  }
}
