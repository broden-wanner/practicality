import { Project } from './project';

declare var moment: any;

export class Subtask {
  id: number;
  name: string;
  completed: boolean;
  dateToComplete: string;
  project: number;

  constructor(id: number, name: string, completed: boolean, dateToComplete: string, project: number) {
    this.id = id;
    this.name = name;
    this.completed = completed;
    this.dateToComplete = moment.utc(dateToComplete).toISOString();
    this.project = project;
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
    return new Subtask(null, null, false, null, project.id);
  }
}
