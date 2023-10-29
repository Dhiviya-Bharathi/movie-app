import { Component, OnInit } from '@angular/core';
import { AppService } from './app.service';
import { Movie } from './movie';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  movies: Observable<Movie[]>;

  constructor(private appService: AppService) {}

  ngOnInit() {
    this.movies = this.appService.getFeaturedMovies();
  }

  onSearchTermChange(search: string) {
    this.movies = this.appService.getTopMovieResults(search);
  }
}
