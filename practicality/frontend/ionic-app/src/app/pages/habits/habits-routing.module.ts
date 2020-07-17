import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HabitListComponent } from './habit-list/habit-list.component';
import { HabitDetailComponent } from './habit-detail/habit-detail.component';

const routes: Routes = [
  {
    path: '',
    component: HabitListComponent,
  },
  {
    path: 'new',
    component: HabitDetailComponent,
  },
  {
    path: ':habitId',
    component: HabitDetailComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HabitsPageRoutingModule {}
