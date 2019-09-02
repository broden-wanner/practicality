import { Component, OnInit } from '@angular/core';
import { NotesService } from '../notes.service';
import { Note } from '../note';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-note-list',
    templateUrl: './note-list.component.html',
    styleUrls: ['./note-list.component.scss']
})
export class NoteListComponent implements OnInit {
    notes: Observable<Note[]>;

    constructor(private router: Router, private notesService: NotesService) {}

    public ngOnInit(): void {
        this.notesService.loadAllNotes();
        this.notes = this.notesService.getAllNotes();
    }

    public goToNote(note: Note): void {
        this.notesService.currentNote = note;
        this.router.navigate([`notes/${note.id}`]);
    }
}
