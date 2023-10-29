import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { SideBarComponent } from './side-bar.component';
import { AppService } from '../app.service';
import { Movie } from '../movie';
import { AppModule } from '../app.module';
import { ReadMoreComponent } from '../results/list-item/read-more/read-more.component';

describe('SideBarComponent', () => {
  let AppServiceMock = {
    getFeaturedMovies: (search: string) => {
      const mockMovies: Movie[] = [{ Title: 'Movie 1' }, { Title: 'Movie 2' }] as Movie[];
      return of(mockMovies);
    }
  }

  let fixture: ComponentFixture<SideBarComponent>;
  let component: SideBarComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SideBarComponent, ReadMoreComponent],
      providers: [{ provide: AppService, useValue: AppServiceMock }],
      imports: [AppModule]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SideBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should initialize component with the feature list', () => {
    expect(component).toBeTruthy();

    component.movies.subscribe((movies: Movie[]) => {
      expect(movies.length).toBe(2); // Assuming the mock service returns 2 movies
      expect(movies[0].Title).toBe('Movie 1');
      expect(movies[1].Title).toBe('Movie 2');
    });
  });
});
