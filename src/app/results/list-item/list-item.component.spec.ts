import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListItemComponent } from './list-item.component';
import { Movie } from '../../movie';
import { ReadMoreComponent } from './read-more/read-more.component';

describe('ListItemComponent', () => {
  let fixture: ComponentFixture<ListItemComponent>;
  let component: ListItemComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListItemComponent, ReadMoreComponent],
    });

    fixture = TestBed.createComponent(ListItemComponent);
    component = fixture.componentInstance;

    // Set up the input data
    component.movie = {
      Rated: 'PG-13',
      Poster: 'poster.jpg',
      Title: 'Movie Title',
      Year: '2022',
      Type: 'Action',
      Genre: 'Action',
      Director: 'Director Name',
      Actors: 'Actor Name',
      Awards: 'Best Movie',
      Plot: 'Plot of the movie goes here.',
    } as Movie;

    fixture.detectChanges();
  });

  it('should create the ListItemComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should display the movie data correctly', () => {
    const cardContainer = fixture.nativeElement.querySelector('.card-container');
    expect(cardContainer).toBeTruthy();

    const rate = fixture.nativeElement.querySelector('.rate');
    expect(rate.textContent).toContain('PG-13');

    const img = fixture.nativeElement.querySelector('img');
    expect(img.getAttribute('src')).toContain('poster.jpg');

    const title = fixture.nativeElement.querySelector('.title');
    expect(title.textContent).toContain('Movie Title');
    expect(title.textContent).toContain('(2022)');

    const type = fixture.nativeElement.querySelector('.type');
    expect(type.textContent).toContain('Action');

    const genre = fixture.nativeElement.querySelector('.content p');
    expect(genre.textContent).toContain('Action');

    const director = fixture.nativeElement.querySelectorAll('.content p')[1];
    expect(director.textContent).toContain('Director Name');

    const actors = fixture.nativeElement.querySelectorAll('.content p')[2];
    expect(actors.textContent).toContain('Actor Name');

    const awards = fixture.nativeElement.querySelector('.awards');
    expect(awards.textContent).toContain('Best Movie');

    const readMore = fixture.nativeElement.querySelector('app-read-more');
    expect(readMore).toBeTruthy();
  });

  it('should apply the "small" class when isSmall is true', () => {
    component.isSmall = true;
    fixture.detectChanges();

    const cardContainer = fixture.nativeElement.querySelector('.card-container');
    expect(cardContainer.classList.contains('small')).toBe(true);
  });
});
