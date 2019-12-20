export class Subtask {
  id: number;
  project: number;
  completed: boolean;
  title: string;

  constructor(data: any) {
    this.id = data.id;
    this.title = data.title;
    this.completed = data.completed;
    this.project = data.project;
  }

  public static fromJson(data: any): Subtask {
    return new Subtask(data);
  }
}
