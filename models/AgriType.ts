import Agriculture from "./Agriculture";

export default class AgriType {
    pk: string;
    name: string;
    description: string;
    agriculture_type_image: string;
    agriculture: Agriculture;

  constructor(
    pk: string, 
    name: string, 
    description: string, 
    agriculture_type_image: string, 
    agriculture: Agriculture
) {
    this.pk = pk
    this.name = name
    this.description = description
    this.agriculture_type_image = agriculture_type_image
    this.agriculture = agriculture
  }

}