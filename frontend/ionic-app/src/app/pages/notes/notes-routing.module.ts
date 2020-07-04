import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NoteListComponent } from './note-list/note-list.component';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { NoteDetailComponent } from './note-detail/note-detail.component';

const routes: Routes = [
  {
    path: '',
    component: NoteListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: ':noteId',
    component: NoteDetailComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NotesPageRoutingModule {}
