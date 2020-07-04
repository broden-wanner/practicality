import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';

import { NotesService } from '../notes.service';
import { Note } from '../../../shared/models/note';
import { FormGroup, FormBuilder } from '@angular/forms';
import { debounceTime, tap, delay } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-note-detail',
  templateUrl: './note-detail.component.html',
  styleUrls: ['./note-detail.component.scss'],
})
export class NoteDetailComponent implements OnInit {
  note: Note;
  saved = false;
  loaded = false;
  noteForm: FormGroup;

  constructor(
    private notesService: NotesService,
    private fb: FormBuilder,
    private route: ActivatedRoute
  ) {
    // Initialize the form with an empty body
    this.noteForm = this.fb.group({ body: '' });
  }

  public ngOnInit(): void {
    // Get the note
    this.route.paramMap.subscribe((params) => {
      this.notesService.getNote(Number(params.get('noteId'))).subscribe((note) => {
        this.note = note;
        // Set the form body and subscribe to note changes
        this.noteForm.setValue({ body: this.note.body });
        this.onNoteChanges();
      });
    });
  }

  /**
   * Subscribe to changes from the note form and send the note changes
   * to the server periodically
   */
  public onNoteChanges(): void {
    this.noteForm.valueChanges
      .pipe(
        // Must be called to prevent error
        delay(0),
        // Set the saved state
        tap(() => {
          if (this.loaded === false) {
            this.loaded = true;
          } else {
            this.saved = false;
          }
        }),
        // Debouce the user input time
        debounceTime(1000)
      )
      .subscribe((val: any) => {
        console.log(val);
        this.note.body = val.body ? val.body : '';
        this.notesService.updateNote(this.note).subscribe(() => {
          this.saved = true;
        });
      });
  }
}
