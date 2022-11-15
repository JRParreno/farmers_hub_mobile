export class User {
    pk: number;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    getFullName: string;

    constructor(
        pk: number,
        username: string,
        email: string,
        firstName: string,
        lastName: string,
        getFullName: string
    ) {
        this.pk = pk;
        this.username = username;
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.getFullName = getFullName;
    }
}

