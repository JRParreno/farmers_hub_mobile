export class RecommendationSeason {
    pk: string;
    season: Season;
    description: string;
    image: string;

  constructor(
    pk: string, 
    season: Season, 
    description: string, 
    image: string
) {
    this.pk = pk
    this.season = season
    this.description = description
    this.image = image
  }

}

export class Season {
    pk: string;
    name: string;
    description: string;

  constructor(pk: string, name: string, description: string) {
    this.pk = pk
    this.name = name
    this.description = description
  }
}