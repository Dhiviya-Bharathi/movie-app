import { Component, Input } from '@angular/core';
import { Movie } from '../movie';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent {
  @Input()
  movieList: Movie[];
}
