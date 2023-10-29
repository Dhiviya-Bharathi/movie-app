import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ResultsComponent } from './results.component';
import { Movie } from '../movie';
import { ListItemComponent } from './list-item/list-item.component';
import { ReadMoreComponent } from './list-item/read-more/read-more.component';

describe('ResultsComponent', () => {
  let fixture: ComponentFixture<ResultsComponent>;
  let component: ResultsComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ResultsComponent, ListItemComponent, ReadMoreComponent],
    });

    fixture = TestBed.createComponent(ResultsComponent);
    component = fixture.componentInstance;
  });

  it('should create the ResultsComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should display the "Search results" heading when movieList is not empty', () => {
    const movieList: Movie[] = [{ imdbID: '1' } as Movie];

    component.movieList = movieList;
    fixture.detectChanges();

    const heading = fixture.nativeElement.querySelector('h1');
    expect(heading.textContent).toContain('Search results');
  });

  it('should display the default message when movieList is empty', () => {
    component.movieList = [];
    fixture.detectChanges();

    const heading = fixture.nativeElement.querySelector('.default-message');
    expect(heading.textContent).toContain('Search by movie title to list movies');
  });
});
