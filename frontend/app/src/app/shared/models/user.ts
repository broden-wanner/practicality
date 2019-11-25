export class User {
    username: string;
    firstName: string;
    lastName: string;
    notesCreated: number;
    id: number;

    constructor(
        username: string,
        firstName: string,
        lastName: string,
        notesCreated: number,
        id: number
    ) {
        this.username = username;
        this.firstName = firstName;
        this.lastName = lastName;
        this.notesCreated = notesCreated;
        this.id = id;
    }

    public static fromJson(data: any): User {
        return new User(
            data.username,
            data.first_name,
            data.last_name,
            data.notes_created,
            data.id
        );
    }
}
