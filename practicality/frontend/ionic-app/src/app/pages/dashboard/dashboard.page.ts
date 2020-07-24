declare var particlesJS: any;
import { Component, OnInit } from '@angular/core';
import { particleConfig } from 'src/app/shared/particles-config';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  constructor() {}

  ngOnInit() {}

  ionViewDidEnter() {
    // Set up the particle packgroud
    particlesJS('particles-js', particleConfig);
  }
}
