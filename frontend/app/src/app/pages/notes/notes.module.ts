import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { QuillModule } from 'ngx-quill';

import { NoteListComponent } from './note-list/note-list.component';
import { NoteDetailComponent } from './note-detail/note-detail.component';
import { AuthGuard } from 'src/app/core/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: NoteListComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    QuillModule.forRoot({
      modules: {
        syntax: false
      }
    }),
    RouterModule.forChild(routes)
  ],
  declarations: [NoteListComponent, NoteDetailComponent]
})
export class NotesModule {}
