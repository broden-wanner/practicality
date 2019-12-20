import { Component, OnInit } from '@angular/core';
import { NotesService } from '../notes.service';
import { Note } from '../../../shared/models/note';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.scss']
})
export class NoteListComponent implements OnInit {
  public notes: Observable<Note[]>;
  public activeNote: Note;
  public saved = true;
  public loaded = false;

  constructor(private notesService: NotesService) {}

  public ngOnInit(): void {
    this.notesService.loadAllNotes();
    this.notes = this.notesService.getAllNotes().pipe(
      tap(notes => {
        // Set the active note to the last note
        this.activeNote = notes[notes.length - 1];
      })
    );
  }

  /**
   * Sets the current note in the note service and returns the url to navigate to
   * @param note - note to navigate to
   */
  public selectNote(note: Note): void {
    this.activeNote = note;
  }

  /**
   * Updates the saved state of the note
   * @param state the emitted saved state of the note
   */
  public updateSavedState(state: boolean): void {
    console.log(state);
    this.saved = state;
  }

  /**
   * Updates the loaded state of the note
   * @param state - the emmitted loaded state of the note
   */
  public updateLoadedState(state: boolean): void {
    this.loaded = state;
  }

  /**
   * Checks for an active note
   * @param note - note to check
   * @returns a boolean that tells whether a note is active
   */
  public isActive(note: Note): boolean {
    return note.id === this.activeNote.id;
  }
}
