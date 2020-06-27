import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ProjectsPage } from './projects.page';
import { ProjectListComponent } from './project-list/project-list.component';
import { ProjectDetailComponent } from './project-detail/project-detail.component';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { SubtaskListComponent } from './subtask-list/subtask-list.component';
import { SubtaskComponent } from './subtask/subtask.component';
import { ProjectComponent } from './project/project.component';

const routes: Routes = [
  {
    path: '',
    component: ProjectsPage,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: ProjectListComponent,
      },
      {
        path: ':title',
        component: ProjectDetailComponent,
      },
    ],
  },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild(routes),
  ],
  declarations: [
    ProjectsPage,
    ProjectComponent,
    ProjectListComponent,
    ProjectDetailComponent,
    SubtaskListComponent,
    SubtaskComponent,
  ],
  entryComponents: [SubtaskComponent],
})
export class ProjectsModule {}
