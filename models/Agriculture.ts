export default class Agriculture {
    pk: string;
    name: string;
    description: string;
    agriculture_image: string;

  constructor(
    pk: string, 
    name: string, 
    description: string, 
    agriculture_image: string
) {
    this.pk = pk
    this.name = name
    this.description = description
    this.agriculture_image = agriculture_image
  }

}