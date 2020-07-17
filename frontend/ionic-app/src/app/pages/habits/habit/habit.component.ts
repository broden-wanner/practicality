import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Habit } from 'src/app/shared/models/habit';
import { IonItemSliding } from '@ionic/angular';
import { HabitService } from '../habit.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-habit',
  templateUrl: './habit.component.html',
  styleUrls: ['./habit.component.scss'],
})
export class HabitComponent implements OnInit {
  @Input() habit: Habit;
  @ViewChild('habitSliding', { read: IonItemSliding }) habitSliding: IonItemSliding;
  public menuOpen: boolean = false;

  constructor(private habitService: HabitService, private router: Router) {}

  ngOnInit() {}

  /**
   * Toggle the sliding menu programatically
   */
  public toggleSlideMenu(): void {
    if (this.menuOpen) {
      this.habitSliding.close();
    } else {
      this.habitSliding.open('end');
    }
    this.menuOpen = !this.menuOpen;
  }

  /**
   * Close the slide menu
   */
  public closeSlideMenu(): void {
    this.habitSliding.close();
    this.menuOpen = false;
  }

  /**
   * Got to the edit screen for the habit
   */
  public editHabit() {
    this.closeSlideMenu();
    this.router.navigate([`/habits/${this.habit.id}`]);
  }

  /**
   * Mark the habit as complete for today
   */
  public checkHabit(): void {
    this.habitService.checkHabit(this.habit).subscribe(() => this.closeSlideMenu());
  }

  /**
   * Delete the habit
   */
  public deleteHabit(): void {
    this.habitService.deleteHabit(this.habit).subscribe(() => this.closeSlideMenu());
  }
}
