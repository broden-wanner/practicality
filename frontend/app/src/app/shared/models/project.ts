export class Project {
  id: number;
  user: number;
  title: string;
  description: string;
  dateCreated: string;
  subtasks: Array<any>;

  constructor(data: any) {
    this.id = data.id;
    this.user = data.user;
    this.title = data.title;
    this.description = data.description;
    this.dateCreated = data.date_created;
    this.subtasks = data.subtasks;
  }

  public static fromJson(data: any): Project {
    return new Project(data);
  }
}
