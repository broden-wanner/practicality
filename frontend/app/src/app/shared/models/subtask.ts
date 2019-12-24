import { Project } from './project';

declare var moment: any;

export class Subtask {
  id: number;
  name: string;
  completed: boolean;
  dateToComplete: string;
  project: number;
  /** For functional purposes */
  editing: boolean;

  constructor(id: number, name: string, completed: boolean, dateToComplete: string, project: number) {
    this.id = id;
    this.name = name;
    this.completed = completed;
    this.dateToComplete = moment.utc(dateToComplete).toISOString();
    if (project <= 0) {
      this.project = null;
    } else {
      this.project = project;
    }
    this.editing = false;
  }

  /**
   * Maps json data from server into a subtask objects
   * @param data - json object from the server to map to a subtask
   */
  public static fromJson(data: any): Subtask {
    return new Subtask(data.id, data.name, data.completed, data.dateToComplete, data.project);
  }

  /**
   * Returns an empty subtask on a project
   * @param project - project to put the subtask on
   */
  public static emptySubtaskOn(project: Project): Subtask {
    if (!project) {
      throw new Error('Project to add subtask to cannot be null.');
    }
    if (project.id <= 0) {
      throw new Error('Project id cannot be <= 0.');
    }
    return new Subtask(0, '', false, '', project.id);
  }

  /**
   * Set the current instance of Subtask's properties equal to the subtask passed in as an argument.
   * This avoids issues with pointers.
   * @param subtask - subtask to set equal to
   */
  public setEqualTo(subtask: Subtask): void {
    this.id = subtask.id;
    this.name = subtask.name;
    this.completed = subtask.completed;
    this.dateToComplete = subtask.dateToComplete;
    this.project = subtask.project;
  }

  /**
   * Classic equals method to compare two subtasks by id. If null,
   * returns false.
   * @param subtask - the subtask to compare
   */
  public equals(subtask: Subtask): boolean {
    if (!subtask) {
      return false;
    }
    return this.id === subtask.id;
  }
}
