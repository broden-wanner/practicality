import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { NotesPage } from './notes.page';
import { NoteDetailComponent } from './note-detail/note-detail.component';

const routes: Routes = [
    {
        path: '',
        component: NotesPage
    },
    {
        path: ':id',
        component: NoteDetailComponent
    }
];

@NgModule({
    imports: [CommonModule, FormsModule, IonicModule, RouterModule.forChild(routes)],
    declarations: [NotesPage, NoteDetailComponent]
})
export class NotesPageModule {}
