export class User {
    username: string;
    firstName: string;
    lastName: string;
    notesCreated: number;
    level: string;
    id: number;

    constructor(
        username: string,
        firstName: string,
        lastName: string,
        notesCreated: number,
        level: string,
        id: number
    ) {
        this.username = username;
        this.firstName = firstName;
        this.lastName = lastName;
        this.notesCreated = notesCreated;
        this.level = level;
        this.id = id;
    }

    public static fromJson(data: any): User {
        if (!data) {
            return null;
        }
        return new User(
            data.username,
            data.first_name,
            data.last_name,
            data.notes_created,
            data.level,
            data.id
        );
    }
}
