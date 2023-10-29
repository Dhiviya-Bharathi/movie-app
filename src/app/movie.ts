export interface Movie {
    Poster: string;
    Title: string;
    Type: string;
    imdbID: string;
    Year: string;
    Rated: string;
    Genre: string;
    Director: string;
    Actors: string;
    Plot: string;
    Awards: string;
}

export interface SearchResponse {
    Search: Movie[];
}