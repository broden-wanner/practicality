declare var moment: any;

export class Habit {
  id: number;
  user: number;
  name: string;
  date_created: string;
  days_completed: number;
  last_done: string;
  active: boolean;

  constructor(data: any) {
    this.id = data.id;
    this.user = data.user;
    this.name = data.name;
    this.days_completed = data.days_completed;
    this.active = data.active;
    this.last_done = data.last_done ? moment(data.last_done) : '';
    this.date_created = moment(data.date_created);
  }

  /**
   * Maps incoming json objects as a Habit object.
   * Used to get access to the methods on the class.
   * @param data json format of the data
   */
  public static fromJson(data: any): Habit {
    return new Habit(data);
  }

  /**
   * Determines if the habit was done today
   * @returns Whether or not the habit has been done today
   */
  public doneToday(): boolean {
    const fmt = 'MMM Do YYYY';
    return moment(this.last_done).format(fmt) === moment().format(fmt);
  }
}
