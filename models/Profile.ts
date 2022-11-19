export default class Profile {
    pk: number;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    getFullName: string;
    mobileNumber: string;
    profilePhoto?: string;

    constructor(
        pk: number,
        username: string,
        email: string,
        firstName: string,
        lastName: string,
        getFullName: string,
        mobileNumber: string,
        profilePhoto: string
    ) {
        this.pk = pk;
        this.username = username;
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.getFullName = getFullName;
        this.mobileNumber = mobileNumber;
        this.profilePhoto = profilePhoto;
    }
}

