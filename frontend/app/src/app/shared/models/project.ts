import { Subtask } from './subtask';

export class Project {
  id: number;
  user: number;
  title: string;
  description: string;
  dateCreated: string;
  dateToComplete: string;
  dateCompleted: string;
  subtasks: Array<Subtask>;
  collapsed: boolean;

  constructor(data: any) {
    this.id = data.id;
    this.user = data.user;
    this.title = data.title;
    this.description = data.description;
    this.dateCreated = data.date_created;
    this.dateToComplete = data.date_to_complete;
    this.dateCompleted = data.date_completed;
    this.subtasks = data.subtasks;
    this.collapsed = false; // Property for display purposes only
  }

  /**
   * Maps data from the server to a Project object
   * @param data - data from server to map to a Project object
   */
  public static fromJson(data: any): Project {
    const project = new Project(data);
    // Map the subtasks to a Subtask class
    project.subtasks = project.subtasks.map(Subtask.fromJson);
    return project;
  }

  /**
   * Toggles the display of the subtasks on the project
   */
  public toggleSubtasks(): void {
    this.collapsed = !this.collapsed;
  }

  /**
   * Returns the progress of the project based on the number of subtasks completed.
   * Gives a value between 0 and 1
   */
  public get progress(): number {
    const completed = this.subtasks.filter(s => s.completed).length;
    return completed / this.subtasks.length;
  }
}
