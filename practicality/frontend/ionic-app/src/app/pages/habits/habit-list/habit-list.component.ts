import { Component, OnInit } from '@angular/core';
import { Habit } from 'src/app/shared/models/habit';
import { Observable } from 'rxjs';
import { HabitService } from '../habit.service';

@Component({
  selector: 'app-habit-list',
  templateUrl: './habit-list.component.html',
  styleUrls: ['./habit-list.component.scss'],
})
export class HabitListComponent implements OnInit {
  public habits: Habit[];

  constructor(private habitsService: HabitService) {}

  public ngOnInit(): void {
    this.habitsService.loadAllHabits();
    this.habitsService.getAllHabits().subscribe((habits) => {
      this.habits = habits;
      console.log('habits on habit page loaded', habits);
    });
  }

  public get doneHabits(): Habit[] {
    return this.habits.filter((h) => h.doneToday());
  }

  public get toDoHabits(): Habit[] {
    return this.habits.filter((h) => !h.doneToday());
  }
}
