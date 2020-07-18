declare var moment: any;
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Habit } from 'src/app/shared/models/habit';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class HabitService {
  private habits = new BehaviorSubject<Habit[]>(new Array<Habit>());

  constructor(private http: HttpClient) {}

  /**
   * Get the habits from the server and load them into the subject
   */
  public loadAllHabits(): void {
    this.http.get<Habit[]>(`${environment.api}/habits/`).subscribe(
      (habits) => {
        this.habits.next(habits.map(Habit.fromJson));
      },
      (error) => {
        this.habits.error(error);
      }
    );
  }

  /**
   * Retuns an observable of all the available habits
   *
   * @returns {Observable<Habit[]>} - The observable of the habits
   */
  public getAllHabits(): Observable<Habit[]> {
    return this.habits.asObservable();
  }

  /**
   * Get a specific habit from the server and return an observable
   * @param id - the id of the habit to retrieve from the server
   * @returns {Observable<Habit>} - An observable of a habit
   */
  public getHabit(id: number): Observable<Habit> {
    return this.http.get<Habit>(`${environment.api}/habits/${id}/`).pipe(map(Habit.fromJson));
  }

  /**
   * Makes a POST request to the api to make a new habit
   * Once successful, add the new habit to the behavior subject
   * @param habit - the new habit object
   * @returns {Observable<Habit>} - an observable of the new habit created
   */
  public createHabit(habit: Habit): Observable<Habit> {
    return this.http.post<Habit>(`${environment.api}/habits/`, habit).pipe(
      map(Habit.fromJson),
      tap((newHabit: Habit) => {
        const currentHabits = this.habits.value;
        this.habits.next([...currentHabits, newHabit]);
        console.log(this.habits.value);
      })
    );
  }

  /**
   * Makes a PUT request to the api to update a habit
   * Once successful, add the habit is updated locally
   * @param habit - the new habit object
   * @returns {Observable<Habit>} - an observable of the new habit created
   */
  public updateHabit(habit: Habit): Observable<Habit> {
    return this.http.put<Habit>(`${environment.api}/habits/${habit.id}/`, habit).pipe(
      map(Habit.fromJson),
      tap((updatedHabit) => {
        let habitsCopy = [...this.habits.value];
        for (let i = 0; i < habitsCopy.length; i++) {
          const h = habitsCopy[i];
          if (h.id === updatedHabit.id) {
            // Take out the old value and input the new one
            habitsCopy.splice(i, 1);
            this.habits.next([...habitsCopy, updatedHabit]);
            break;
          }
        }
      })
    );
  }

  /**
   * Update the habit to be checked. Only done if it hasn't been last
   * done today
   * @param habit - the new habit object
   * @returns {Observable<Habit>} - an observable of the new habit created
   */
  public checkHabit(habit: Habit): Observable<Habit> {
    if (!habit.doneToday()) {
      habit.last_done = moment.utc().toISOString();
      habit.days_completed += 1;
      return this.updateHabit(habit);
    }
  }

  /**
   * Delete a habit
   * @param habit The habit to delete
   */
  public deleteHabit(habit: Habit): Observable<any> {
    return this.http.delete(`${environment.api}/habits/${habit.id}/`).pipe(
      tap(() => {
        let habitsCopy = [...this.habits.value];
        for (let i = 0; i < habitsCopy.length; i++) {
          const h = habitsCopy[i];
          if (h.id === habit.id) {
            habitsCopy.splice(i, 1);
            this.habits.next(habitsCopy);
            break;
          }
        }
      })
    );
  }
}
