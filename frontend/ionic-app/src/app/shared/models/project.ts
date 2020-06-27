declare var moment: any;

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

  constructor(
    id: number,
    user: number,
    title: string,
    description: string,
    dateCreated: string,
    dateToComplete: string,
    dateCompleted: string,
    subtasks: Subtask[]
  ) {
    this.id = id;
    this.user = user;
    this.title = title;
    this.description = description;
    this.dateCreated = moment.utc(dateCreated).toISOString();
    this.dateToComplete = moment.utc(dateToComplete).toISOString();
    this.dateCompleted = moment.utc(dateCompleted).toISOString();
    if (Array.isArray(subtasks)) {
      this.subtasks = subtasks.map(Subtask.fromJson);
    } else {
      this.subtasks = new Array<Subtask>();
    }
    this.collapsed = false; // Property for display purposes only
  }

  /**
   * Returns the progress of the project based on the number of subtasks completed.
   * Gives a value between 0 and 1
   */
  public get progress(): number {
    if (this.subtasks.length === 0) {
      return 0;
    }
    const completed = this.subtasks.filter((s) => s.completed).length;
    return completed / this.subtasks.length;
  }

  /**
   * Maps data from the server to a Project object
   * @param data - data from server to map to a Project object
   */
  public static fromJson(data: any): Project {
    const project = new Project(
      data.id,
      data.user,
      data.title,
      data.description,
      data.dateCreated,
      data.dateToComplete,
      data.dateCompleted,
      data.subtasks
    );
    return project;
  }

  equals(project: Project): boolean {
    return project.id === this.id;
  }

  /**
   * Toggles the display of the subtasks on the project
   */
  public toggleSubtasks(): void {
    this.collapsed = !this.collapsed;
  }
}
