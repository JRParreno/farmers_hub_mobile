import Profile from "./Profile";
import Comment from "./Comment";

export default class Post {
    pk: string;
    profile: Profile;
    description: string;
    image?: string;
    dateCreated: string;
    dateUpdated: string;
    commentTotal: number;

    constructor(
        pk: string,
        profile: Profile,
        description: string,
        dateCreated: string,
        dateUpdated: string,
        commentTotal: number,
        image?: string,
    ) {
        this.pk = pk;
        this.profile = profile;
        this.description = description;
        this.image = image;
        this.dateCreated = dateCreated;
        this.dateUpdated = dateUpdated;
        this.commentTotal = commentTotal;
    }
}