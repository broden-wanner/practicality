import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { IonicModule } from '@ionic/angular';

import { NoteListComponent } from './note-list/note-list.component';
import { NoteDetailComponent } from './note-detail/note-detail.component';

const routes: Routes = [
    {
        path: '',
        component: NoteListComponent
    },
    {
        path: ':id',
        component: NoteDetailComponent
    }
];

@NgModule({
    imports: [CommonModule, FormsModule, IonicModule, CKEditorModule, RouterModule.forChild(routes)],
    declarations: [NoteListComponent, NoteDetailComponent]
})
export class NotesModule {}
