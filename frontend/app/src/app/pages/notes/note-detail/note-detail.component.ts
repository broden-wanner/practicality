import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';

import { NotesService } from '../notes.service';
import { Note } from '../../../shared/models/note';
import { FormGroup, FormBuilder } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-note-detail',
  templateUrl: './note-detail.component.html',
  styleUrls: ['./note-detail.component.scss']
})
export class NoteDetailComponent implements OnInit, OnChanges {
  @Input() public note: Note;
  public noteForm: FormGroup;

  constructor(private notesService: NotesService, private fb: FormBuilder) {
    // Initialize the form with an empty body
    this.noteForm = this.fb.group({ body: '' });
  }

  public ngOnInit(): void {
    // Initialize the form and subscribe to note changes
    this.onNoteChanges();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.note.currentValue) {
      // If the input note is changes, reset the form
      this.noteForm.setValue({ body: changes.note.currentValue.body });
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
