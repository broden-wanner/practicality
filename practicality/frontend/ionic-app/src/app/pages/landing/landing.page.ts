declare var particlesJS: any;
import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { particleConfig } from 'src/app/shared/particles-config';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.scss'],
})
export class LandingPage implements OnInit {
  public isDesktop = false;
  public slideOpts = {
    initialSlide: 0,
    speed: 400,
  };

  constructor(private platform: Platform) {}

  ngOnInit() {
    // If the width is above 768px (md), set to desktop
    this.isDesktop = this.platform.width() > 768;
  }

  ionViewDidEnter() {
    // Set up the particle packgroud
    particlesJS('particles-js', particleConfig);
  }
}
