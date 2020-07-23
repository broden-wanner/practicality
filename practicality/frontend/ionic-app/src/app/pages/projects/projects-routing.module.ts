import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProjectListComponent } from './project-list/project-list.component';
import { ProjectDetailComponent } from './project-detail/project-detail.component';
import { AuthGuard } from 'src/app/core/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: ProjectListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: ':projectId',
    component: ProjectDetailComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProjectsPageRoutingModule {}
