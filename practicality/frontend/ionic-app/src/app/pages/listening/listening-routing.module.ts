import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListeningPage } from './listening.page';

const routes: Routes = [
  {
    path: '',
    component: ListeningPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListeningPageRoutingModule {}
