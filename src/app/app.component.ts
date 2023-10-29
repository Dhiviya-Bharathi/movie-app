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

  onSearchTermChange(search: string) {
    this.movies = this.appService.getTopMovieResults(search);
  }
}
