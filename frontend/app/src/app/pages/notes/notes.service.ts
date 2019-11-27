import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Note } from '../../shared/models/note';
import { tap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NotesService {
  private notes = new BehaviorSubject<Note[]>(new Array<Note>());
  public currentNote: Note;

  constructor(private http: HttpClient) {}

  /**
   * Get the notes from the server and load them into the subject
   */
  public loadAllNotes(): void {
    this.http.get<Note[]>('/api/notes/').subscribe(
      notes => {
        this.notes.next(notes.map(Note.fromJson));
      },
      error => {
        this.notes.error(error);
      }
    );
  }

  /**
   * Retuns an observable of all the available notes
   */
  public getAllNotes(): Observable<Note[]> {
    return this.notes.asObservable();
  }

  /**
   * Get a specific note from the server and return an observable
   * @param note - the id of the note to retrieve from the server
   */
  public getNote(noteId: number): Observable<Note> {
    return this.http.get<Note>(`/api/notes/${noteId}/`).pipe(
      map(Note.fromJson),
      tap(note => (this.currentNote = note))
    );
  }

  /**
   * PUT an updated note to the server
   * @param note - The new note to update
   */
  public updateNote(note: Note): Observable<any> {
    return this.http.put<Note>(`/api/notes/${note.id}/`, note);
  }
}
