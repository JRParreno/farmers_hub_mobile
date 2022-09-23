import Author from "./Author";
import Infestation from "./Infestation";
import { RecommendationSeason } from "./Season";

export default class Recommendation {
    pk: string;
    title: string;
    author: Author;
    rate: number;
    link: string;
    seasons: Array<RecommendationSeason>;
    infestations: Array<Infestation>;

  constructor(
    pk: string, 
    title: string, 
    author: Author, 
    rate: number, 
    link: string, 
    seasons: Array<RecommendationSeason>, 
    infestations: Array<Infestation>
) {
    this.pk = pk
    this.title = title
    this.author = author
    this.rate = rate
    this.link = link
    this.seasons = seasons
    this.infestations = infestations
  }
}