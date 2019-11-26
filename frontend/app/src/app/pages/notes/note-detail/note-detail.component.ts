import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { NotesService } from '../notes.service';
import { Note } from '../../../shared/models/note';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-note-detail',
  templateUrl: './note-detail.component.html',
  styleUrls: ['./note-detail.component.scss']
})
export class NoteDetailComponent implements OnInit {
  public note: Note;

  constructor(private route: ActivatedRoute, private notesService: NotesService) {}

  public ngOnInit(): void {
    if (this.notesService.currentNote) {
      this.note = this.notesService.currentNote;
    } else {
      this.route.paramMap.subscribe(params => {
        // Get the id from the url parameters
        const noteId = +params.get('id');
        // Make a GET request to the server to get the note
        this.notesService.getNote(noteId).subscribe(note => {
          this.note = note;
        });
      });
    }
  }
}
