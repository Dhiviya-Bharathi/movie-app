import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie } from '../movie';
import { AppService } from '../app.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent {
  movies: Observable<Movie[]>;

  constructor(private appService: AppService) {}

  ngOnInit() {
    // Fetch featured movies using the AppService and assign the result to the 'movies' property
    this.movies = this.appService.getFeaturedMovies();
  }
}
