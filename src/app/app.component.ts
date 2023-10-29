import { Component } from '@angular/core';
import { AppService } from './app.service';
import { Movie } from './movie';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  movies: Observable<Movie[]>;

  constructor(private appService: AppService) {}

  /*
    Method to handle changes in the search term
    It triggers a call to AppService to get the top movie results for the provided search term
    and assigns the result to the 'movies' property
  */
  onSearchTermChange(search: string) {
    this.movies = this.appService.getTopMovieResults(search);
  }
}
