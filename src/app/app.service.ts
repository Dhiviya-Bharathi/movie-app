import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable, forkJoin, map, switchMap } from 'rxjs';
import { Movie, SearchResponse } from './movie';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  private apiKey = '6c3a2d45';
  private url = 'https://www.omdbapi.com/';
  private size = 5;

  constructor(private httpClient: HttpClient) { }

  getTopMovieResults(search: string): Observable<Movie[]> {
    return this.searchMovies(search).pipe(
      map(movies => movies.slice(0, this.size).map(movie => movie.imdbID)),
      switchMap(ids => {
        const requests = ids.map(id => this.getMovie(id));
        return forkJoin(requests).pipe(
          map(fullResponses => fullResponses.map(item => ({
            Poster: item.Poster,
            Title: item.Title,
            Type: item.Type,
            Year: item.Year,
            imdbID: item.imdbID,
            Rated: item.Rated,
            Genre: item.Genre,
            Director: item.Director,
            Actors: item.Actors,
            Plot: item.Plot,
            Awards: item.Awards
          }))
          )
        );
      })
    );
  }

  private searchMovies(search: string): Observable<Movie[]> {
    return this.httpClient.get<SearchResponse>(`${this.url}?s=${search}&apiKey=${this.apiKey}`).pipe(
      map(movies => movies.Search)
    );
  }

  private getMovie(id: string): Observable<Movie> {
    return this.httpClient.get<Movie>(`${this.url}?i=${id}&apiKey=${this.apiKey}&plot=full`);
  }
}
