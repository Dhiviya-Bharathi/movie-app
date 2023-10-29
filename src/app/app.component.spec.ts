import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { AppService } from './app.service';
import { of } from 'rxjs';
import { Movie } from './movie';
import { FormsModule } from '@angular/forms';
import { AppModule } from './app.module';

describe('AppComponent', () => {
  const mockMovies: Movie[] = [{ Title: 'Movie 1' }, { Title: 'Movie 2' }] as Movie[];
  let AppServiceMock = {
    getTopMovieResults: (search: string) => {
      return of(mockMovies);
    },
    getFeaturedMovies: () => {
      return of(mockMovies);
    }
  }

  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  let appService: AppService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent],
      providers: [{ provide: AppService, useValue: AppServiceMock }],
      imports: [FormsModule, AppModule]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    appService = TestBed.inject(AppService);
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should update movies when onSearchTermChange is called', () => {
    spyOn(appService, 'getTopMovieResults').and.returnValue(of(mockMovies));
    const searchTerm = 'search term';

    component.onSearchTermChange(searchTerm);

    component.movies.subscribe((movies: Movie[]) => {
      expect(movies.length).toBe(2); // Assuming the mock service returns 2 movies
      expect(movies[0].Title).toBe('Movie 1');
      expect(movies[1].Title).toBe('Movie 2');
    });
  });
});
