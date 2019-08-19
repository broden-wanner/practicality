import { Component, OnInit } from '@angular/core';
import { NotesService } from './notes.service';
import { Note } from './note';

@Component({
    selector: 'app-notes',
    templateUrl: './notes.page.html',
    styleUrls: ['./notes.page.scss']
})
export class NotesPage implements OnInit {
    notes: Note[];

    constructor(private notesService: NotesService) {}

    ngOnInit() {
        this.notesService.getNotes().subscribe(notes => (this.notes = notes));
    }
}
