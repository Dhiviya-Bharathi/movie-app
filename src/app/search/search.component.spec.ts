import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchComponent } from './search.component';
import { FormsModule } from '@angular/forms';

describe('SearchComponent', () => {
  let fixture: ComponentFixture<SearchComponent>;
  let component: SearchComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SearchComponent],
      imports: [FormsModule]
    });

    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
  });

  it('should create the SearchComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should emit a search term when onSearch is called', () => {
    const searchTerm = 'test search';
    let emittedSearchTerm: string | undefined;

    component.searchTermChange.subscribe((term: string) => {
      emittedSearchTerm = term;
    });

    component.searchTerm = searchTerm;
    component.onSearch();

    expect(emittedSearchTerm).toBe(searchTerm);
  });
});
