declare var particlesJS: any;
import { Component, OnInit, OnDestroy } from '@angular/core';
import { particleConfig } from 'src/app/shared/particles-config';
import { ProjectService } from '../projects/project.service';
import { NotesService } from '../notes/notes.service';
import { HabitService } from '../habits/habit.service';
import { Project } from 'src/app/shared/models/project';
import { Note } from 'src/app/shared/models/note';
import { Habit } from 'src/app/shared/models/habit';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  public projects: Observable<Project[]>;
  public notes: Observable<Note[]>;
  public habits: Observable<Habit[]>;
  public listLength = 5;

  constructor(
    private projectService: ProjectService,
    private noteService: NotesService,
    private habitService: HabitService
  ) {}

  ngOnInit() {
    this.projectService.loadAllProjects();
    this.projects = this.projectService.getAllProjects().pipe(
      map((projects) => {
        const len = Math.min(projects.length, this.listLength);
        return projects.splice(0, len);
      })
    );

    this.noteService.loadAllNotes();
    this.notes = this.noteService.getAllNotes().pipe(
      map((notes) => {
        const len = Math.min(notes.length, this.listLength);
        return notes.splice(0, len);
      })
    );

    this.habitService.loadAllHabits();
    this.habits = this.habitService.getAllHabits().pipe(
      map((habits) => {
        const len = Math.min(habits.length, this.listLength);
        console.log('habits in dasboard', habits);
        return habits.splice(0, len);
      })
    );
  }

  ionViewDidEnter() {
    // Set up the particle packgroud
    particlesJS('particles-js', particleConfig);
  }
}
