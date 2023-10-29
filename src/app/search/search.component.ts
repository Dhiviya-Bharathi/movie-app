import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  searchTerm: string = '';

  @Output() searchTermChange: EventEmitter<string> = new EventEmitter<string>();

  onSearch() {
    // Emit the search term to notify parent components about the change
    this.searchTermChange.emit(this.searchTerm);
  }
}
