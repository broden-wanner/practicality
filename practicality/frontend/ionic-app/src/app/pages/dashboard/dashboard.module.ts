import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DashboardPageRoutingModule } from './dashboard-routing.module';

import { DashboardPage } from './dashboard.page';
import { ProjectService } from '../projects/project.service';
import { NotesService } from '../notes/notes.service';
import { HabitService } from '../habits/habit.service';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, DashboardPageRoutingModule],
  declarations: [DashboardPage],
  providers: [ProjectService, NotesService, HabitService],
})
export class DashboardPageModule {}
