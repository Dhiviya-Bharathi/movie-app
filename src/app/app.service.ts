import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, forkJoin, map, of, switchMap } from 'rxjs';
import { Movie, SearchResponse } from './movie';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  private apiKey = '6c3a2d45';
  private url = 'https://www.omdbapi.com/';
  private size = 5;

  constructor(private httpClient: HttpClient) { }

  // Fetch the top movie results based on a search term
  // Returns an Observable of an array of Movie objects
  getTopMovieResults(search: string): Observable<Movie[]> {
    return this.searchMovies(search).pipe(
      map(movies => movies.slice(0, this.size).map(movie => movie.imdbID)),
      switchMap(ids => {
        const requests = ids.map(id => this.getMovie(id));
        return forkJoin(requests);
      })
    );
  }

  // Fetch details of featured movies
  // Returns an Observable of an array of Movie objects
  getFeaturedMovies(): Observable<Movie[]> {
    return forkJoin(this.getMovie('tt1517268'), this.getMovie('tt15398776'));
  }

  // Private method to search for movies by title
  // Returns an Observable of an array of Movie objects
  private searchMovies(search: string): Observable<Movie[]> {
    return this.httpClient.get<SearchResponse>(`${this.url}?s=${search}&apiKey=${this.apiKey}`).pipe(
      map(movies => movies.Search),
      catchError(() => of([]))
    );
  }

  // Private method to fetch detailed information about a specific movie by its ID
  // Returns an Observable of a single Movie object
  private getMovie(id: string): Observable<Movie> {
    return this.httpClient.get<Movie>(`${this.url}?i=${id}&apiKey=${this.apiKey}&plot=full`).pipe(
      map(fullResponse => ({
        Poster: fullResponse.Poster,
        Title: fullResponse.Title,
        Type: fullResponse.Type,
        Year: fullResponse.Year,
        imdbID: fullResponse.imdbID,
        Rated: fullResponse.Rated,
        Genre: fullResponse.Genre,
        Director: fullResponse.Director,
        Actors: fullResponse.Actors,
        Plot: fullResponse.Plot,
        Awards: fullResponse.Awards,
        Website: fullResponse.Website
      })),
      catchError(() => of(undefined))
    );
  }
}
