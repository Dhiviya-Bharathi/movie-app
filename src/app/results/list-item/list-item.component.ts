import { Component, Input } from '@angular/core';
import { Movie } from '../../movie';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss']
})
export class ListItemComponent {
  @Input()
  movie: Movie;

  @Input()
  isSmall: boolean = false;
}
