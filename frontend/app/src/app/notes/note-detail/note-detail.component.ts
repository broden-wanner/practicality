import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NotesService } from '../notes.service';
import { Note } from '../note';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
    selector: 'app-note-detail',
    templateUrl: './note-detail.component.html',
    styleUrls: ['./note-detail.component.scss']
})
export class NoteDetailComponent implements OnInit {
    noteObs: Observable<Note>;

    constructor(private route: ActivatedRoute, private notesService: NotesService) {}

    public ngOnInit(): void {
        if (this.notesService.currentNote) {
            this.noteObs = of(this.notesService.currentNote);
        } else {
            this.noteObs = this.route.paramMap.pipe(
                switchMap(params => {
                    const noteId = +params.get('id');
                    return this.notesService.getNote(noteId);
                })
            );
        }
    }
}
