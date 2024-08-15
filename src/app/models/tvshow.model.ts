export interface TvShow {
    id: string;
    name: string;
    overview: string;
    genres: { id: number; name: string }[];
    first_air_date: string;
    poster_path: string;
  }
  
  