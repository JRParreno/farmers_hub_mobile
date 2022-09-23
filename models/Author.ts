import User from "./User";

export default class Author {
    pk: string;
    user: User;
    profile_photo: string;

  constructor(pk: string, user: User, profile_photo: string) {
    this.pk = pk
    this.user = user
    this.profile_photo = profile_photo
  }
}