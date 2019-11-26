declare var moment: any;

export class Note {
  id: number;
  creator: number;
  title: string;
  body: string;
  dateCreated: string;

  constructor(data: any) {
    this.id = data.id;
    this.creator = data.creator;
    this.title = data.title;
    this.body = data.body;
    this.dateCreated = moment(data.date_created);
  }

  public static fromJson(data: any): Note {
    return new Note(data);
  }
}
