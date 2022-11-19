import Profile from "./Profile"

export default class Comment {
    pk: string;
    post: string;
    profile: Profile;
    description: string;
    dateCreated: string;
    dateUpdated: string;

    constructor(
        pk: string,
        post: string,
        profile: Profile,
        description: string,
        dateCreated: string,
        dateUpdated: string
    ) {
        this.pk = pk;
        this.post = post;
        this.profile = profile;
        this.description = description;
        this.dateCreated = dateCreated;
        this.dateUpdated = dateUpdated;
    }
}