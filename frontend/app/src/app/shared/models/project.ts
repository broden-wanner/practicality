import { Subtask } from './subtask';

export class Project {
  id: number;
  user: number;
  title: string;
  description: string;
  dateCreated: string;
  subtasks: Array<any>;
  collapsed: boolean;

  constructor(data: any) {
    this.id = data.id;
    this.user = data.user;
    this.title = data.title;
    this.description = data.description;
    this.dateCreated = data.date_created;
    this.subtasks = data.subtasks;
    this.collapsed = false; // Property for display purposes only
  }

  public static fromJson(data: any): Project {
    const project = new Project(data);
    project.subtasks = project.subtasks.map(Subtask.fromJson);
    return project;
  }

  public toggleSubtasks(): void {
    this.collapsed = !this.collapsed;
  }

  public get progress(): number {
    const completed = this.subtasks.filter(s => s.completed).length;
    return completed / this.subtasks.length;
  }
}
