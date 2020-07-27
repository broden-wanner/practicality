import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Note } from '../../shared/models/note';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class NotesService {
  private notes = new BehaviorSubject<Note[]>(new Array<Note>());

  constructor(private http: HttpClient) {}

  /**
   * Get the notes from the server and load them into the subject
   */
  public loadAllNotes(): void {
    this.http.get<Note[]>(`${environment.api}/notes/`).subscribe(
      (notes) => {
        this.notes.next(notes.map(Note.fromJson));
      },
      (error) => {
        this.notes.error(error);
      }
    );
  }

  /**
   * Retuns an observable of all the available notes. Sorts the list by date.
   */
  public getAllNotes(): Observable<Note[]> {
    return this.notes.asObservable().pipe(
      map((notes) => {
        // Sort in reverse order of date
        notes.sort((a, b) => Number(new Date(b.dateCreated)) - Number(new Date(a.dateCreated)));
        return notes;
      })
    );
  }

  /**
   * Get a specific note from the server and return an observable
   * @param note - the id of the note to retrieve from the server
   */
  public getNote(noteId: number): Observable<Note> {
    return this.http.get<Note>(`${environment.api}/notes/${noteId}/`).pipe(map(Note.fromJson));
  }

  /**
   * PUT an updated note to the server
   * @param note - The new note to update
   */
  public updateNote(note: Note): Observable<any> {
    return this.http.put<Note>(`${environment.api}/notes/${note.id}/`, note);
  }
}
