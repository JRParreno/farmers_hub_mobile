export default class User {
    pk: string;
    email: string;
    first_name: string;
    last_name: string;
    username: string;
    get_full_name: string;

  constructor(
    pk: string, 
    email: string, 
    first_name: string, 
    last_name: string, 
    username: string, 
    get_full_name: string
) {
    this.pk = pk
    this.email = email
    this.first_name = first_name
    this.last_name = last_name
    this.username = username
    this.get_full_name = get_full_name
  }

}