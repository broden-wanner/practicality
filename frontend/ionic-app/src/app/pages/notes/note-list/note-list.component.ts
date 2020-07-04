import { Component, OnInit } from '@angular/core';
import { NotesService } from '../notes.service';
import { Note } from '../../../shared/models/note';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.scss'],
})
export class NoteListComponent implements OnInit {
  public notes: Observable<Note[]>;

  constructor(private notesService: NotesService) {}

  public ngOnInit(): void {
    this.notesService.loadAllNotes();
    this.notes = this.notesService.getAllNotes();
  }
}
