declare var moment: any;

export class Note {
  id: number;
  user: number;
  body: string;
  dateCreated: string;

  constructor(data: any) {
    this.id = data.id;
    this.user = data.user;
    this.body = data.body;
    this.dateCreated = moment(data.date_created);
  }

  public static fromJson(data: any): Note {
    return new Note(data);
  }
}
