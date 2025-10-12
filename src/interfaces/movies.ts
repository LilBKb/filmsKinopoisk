export interface Country {
  country: string;
}

export interface Genre {
  genre: string;
}

export interface MovieItem {
  kinopoiskId: number;
  nameRu: string | null;
  nameEn: string | null;
  nameOriginal: string | null;
  countries: Country[];
  genres: Genre[];
  ratingKinopoisk: number | null;
  ratingImbd: number | null;
  year: string | null;
  type: "FILM" | "TV_SERIES" | "MINI_SERIES" | "TV_SHOW" | string;
  posterUrl: string;
  posterUrlPreview: string;
}

export interface MoviesResponse {
  total: number;
  totalPages: number;
  items: MovieItem[];
}


export interface apiQuery{
  countries:string,
  genreId:string,
  order:string,
  type:string,
  page:number,
}

export interface genreType{
  genre:string,
  id:number
}

export interface countriesType{
  country:string,
  id:number
}