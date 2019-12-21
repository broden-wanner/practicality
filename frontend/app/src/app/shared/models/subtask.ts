export class Subtask {
  id: number;
  project: number;
  completed: boolean;
  dateToComplete: string;
  name: string;

  constructor(data: any) {
    this.id = data.id;
    this.name = data.name;
    this.completed = data.completed;
    this.dateToComplete = data.date_to_complete;
    this.project = data.project;
  }

  /**
   * Maps json data from server into a subtask objects
   * @param data - json object from the server to map to a subtask
   */
  public static fromJson(data: any): Subtask {
    return new Subtask(data);
  }

  /**
   * Maps a subtask to json for the server
   */
  public toJson(): any {
    return {
      id: this.id,
      name: this.name,
      completed: this.completed,
      date_to_complete: this.dateToComplete,
      project: this.project
    };
  }
}
