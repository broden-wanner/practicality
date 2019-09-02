import { Component, OnInit } from '@angular/core';
import { NotesService } from './notes.service';
import { Note } from './note';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-notes',
    templateUrl: './notes.page.html',
    styleUrls: ['./notes.page.scss']
})
export class NotesPage implements OnInit {
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
