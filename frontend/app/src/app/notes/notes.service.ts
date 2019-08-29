import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Note } from './note';

@Injectable({
    providedIn: 'root'
})
export class NotesService {
    private notes = new BehaviorSubject<Note[]>(null);

    constructor(private http: HttpClient) {
        this.loadNotes();
    }

    /**
     * Get the notes from the server and load them into the subject
     */
    loadNotes(): void {
        this.http
            .get<Note[]>(`/api/notes/`)
            .subscribe(notes => this.notes.next(notes), error => this.notes.error(error));
    }

    /**
     * Retuns an observable of the notes
     */
    getNotes(): Observable<Note[]> {
        return this.notes.asObservable();
    }
}
