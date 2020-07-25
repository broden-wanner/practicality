import { Component, OnInit, Input } from '@angular/core';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  @Input() showButtons = true;
  isDesktop = false;

  constructor(private platform: Platform) {}

  ngOnInit() {
    // If the width is above 768px (md), set to desktop
    this.isDesktop = this.platform.width() > 768;
  }
}
