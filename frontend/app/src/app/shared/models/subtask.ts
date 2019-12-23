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
    this.project = project;
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
    return new Subtask(0, '', false, '', project.id);
  }

  public equals(subtask: Subtask): boolean {
    if (!subtask) {
      return false;
    }
    return this.id === subtask.id;
  }
}
