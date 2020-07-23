import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProjectListComponent } from './project-list/project-list.component';
import { ProjectDetailComponent } from './project-detail/project-detail.component';
import { SubtaskListComponent } from './components/subtask-list/subtask-list.component';
import { SubtaskComponent } from './components/subtask/subtask.component';
import { ProjectComponent } from './components/project/project.component';
import { ProjectsPageRoutingModule } from './projects-routing.module';

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, IonicModule, ProjectsPageRoutingModule],
  declarations: [
    ProjectComponent,
    ProjectListComponent,
    ProjectDetailComponent,
    SubtaskListComponent,
    SubtaskComponent,
  ],
  entryComponents: [SubtaskComponent],
})
export class ProjectsPageModule {}
