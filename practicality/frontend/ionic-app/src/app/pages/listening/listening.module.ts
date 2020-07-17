import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListeningPageRoutingModule } from './listening-routing.module';

import { ListeningPage } from './listening.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListeningPageRoutingModule
  ],
  declarations: [ListeningPage]
})
export class ListeningPageModule {}
