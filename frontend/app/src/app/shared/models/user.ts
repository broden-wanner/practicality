export class User {
    username: string;
    firstName: string;
    lastName: string;
    id: number;

    constructor(username: string, firstName: string, lastName: string, id: number) {
        this.username = username;
        this.firstName = firstName;
        this.lastName = lastName;
        this.id = id;
    }

    public static fromJson(data: any): User {
        return new User(data.username, data.first_name, data.last_name, data.id);
    }
}
