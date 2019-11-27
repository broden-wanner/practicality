import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { NotesService } from '../notes.service';
import { Note } from '../../../shared/models/note';
import { FormGroup, FormBuilder } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-note-detail',
  templateUrl: './note-detail.component.html',
  styleUrls: ['./note-detail.component.scss']
})
export class NoteDetailComponent implements OnInit {
  public note: Note;
  public noteForm: FormGroup;

  constructor(private route: ActivatedRoute, private notesService: NotesService, private fb: FormBuilder) {}

  public ngOnInit(): void {
    if (this.notesService.currentNote) {
      this.note = this.notesService.currentNote;
      // Initialize the form and subscribe to note changes
      this.noteForm = this.fb.group({ body: this.note.body });
      this.onNoteChanges();
    } else {
      this.route.paramMap.subscribe(params => {
        // Get the id from the url parameters
        const noteId = +params.get('id');
        // Make a GET request to the server to get the note
        this.notesService.getNote(noteId).subscribe(note => {
          this.note = note;
          // Initialize the form to the note once retrieved
          this.noteForm = this.fb.group({ body: this.note.body });
          this.onNoteChanges();
        });
      });
    }
  }

  /**
   * Subscribe to changes from the note form and send the note changes
   * to the server periodically
   */
  public onNoteChanges(): void {
    this.noteForm.valueChanges
      .pipe(
        // Debouce the user input time
        debounceTime(500)
      )
      .subscribe(val => {
        this.note.body = val.body ? val.body : '';
        this.notesService.updateNote(this.note).subscribe();
      });
  }
}
