export class Subtask {
  id: number;
  project: number;
  completed: boolean;
  name: string;

  constructor(data: any) {
    this.id = data.id;
    this.name = data.name;
    this.completed = data.completed;
    this.project = data.project;
  }

  public static fromJson(data: any): Subtask {
    return new Subtask(data);
  }
}
