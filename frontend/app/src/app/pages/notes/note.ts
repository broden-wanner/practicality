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
        this.dateCreated = data.date_created ? data.date_created : data.dateCreated;
    }
}
