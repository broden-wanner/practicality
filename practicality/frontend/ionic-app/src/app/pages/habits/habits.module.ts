import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HabitsPageRoutingModule } from './habits-routing.module';
import { HabitListComponent } from './habit-list/habit-list.component';
import { HabitDetailComponent } from './habit-detail/habit-detail.component';
import { HabitComponent } from './habit/habit.component';
import { HabitService } from './habit.service';

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, IonicModule, HabitsPageRoutingModule],
  declarations: [HabitComponent, HabitListComponent, HabitDetailComponent],
  providers: [HabitService],
})
export class HabitsPageModule {}
