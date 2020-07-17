import { Component, OnInit } from '@angular/core';
import { HabitService } from '../habit.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastService } from 'src/app/shared/services/toast.service';
import { Habit } from 'src/app/shared/models/habit';

@Component({
  selector: 'app-habit-detail',
  templateUrl: './habit-detail.component.html',
  styleUrls: ['./habit-detail.component.scss'],
})
export class HabitDetailComponent implements OnInit {
  public habit: Habit;
  public habitForm: FormGroup;
  public isNewHabit: boolean;

  constructor(
    private habitService: HabitService,
    private fb: FormBuilder,
    private toastService: ToastService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.habitForm = this.fb.group({ name: '' });
  }

  public ngOnInit(): void {
    if (this.router.url.endsWith('new')) {
      this.isNewHabit = true;
      return;
    }
    // Get the habit
    this.route.paramMap.subscribe((params) => {
      this.habitService.getHabit(Number(params.get('habitId'))).subscribe((habit: Habit) => {
        this.habit = habit;
        // Set the form body and subscribe to note changes
        this.habitForm.setValue({ name: this.habit.name });
      });
    });
  }

  /**
   * Creates a new habit from the form and submits it to the server
   *
   * @returns {void}
   */
  public onSubmit(): void {
    if (this.isNewHabit) {
      const habit = Habit.fromJson(this.habitForm.value);
      this.habitService.createHabit(habit).subscribe(
        () => this.router.navigate(['/habits']),
        (error) => {
          console.error(error);
          this.toastService.sendMessage('Could not create habit', 'danger', 2000);
        }
      );
    } else {
      this.habit.name = this.habitForm.value.name;
      this.habitService.updateHabit(this.habit).subscribe(
        () => this.router.navigate(['/habits']),
        () => {
          this.toastService.sendMessage('Could not update habit', 'danger', 2000);
        }
      );
    }
  }
}
