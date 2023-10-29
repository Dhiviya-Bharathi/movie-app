import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AppService } from './app.service';
import { Movie, SearchResponse } from './movie';

describe('AppService', () => {
  const apiKey = '6c3a2d45';
  const url = 'https://www.omdbapi.com/';
  let appService: AppService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AppService],
    });

    appService = TestBed.inject(AppService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify(); // Ensure that no unexpected requests were made.
  });

  it('should be created', () => {
    expect(appService).toBeTruthy();
  });

  it('should return top movie results', () => {
    const searchTerm = 'Avengers';
  
    const searchResponse: SearchResponse = {
      Search: [
        { imdbID: '1' },
        { imdbID: '2' }
      ] as Movie[]
    };
  
    const movieDetails: Movie[] = mockMovies() as Movie[];
  
    appService.getTopMovieResults(searchTerm).subscribe((result) => {
      expect(result).toEqual(movieDetails);
    });
  
    const searchRequest = httpTestingController.expectOne(
      (req) => req.url === `${url}?s=${searchTerm}&apiKey=${apiKey}`
    );
    expect(searchRequest.request.method).toBe('GET');
    searchRequest.flush(searchResponse);
  
    // Match and flush each movie request
    const movieRequests = httpTestingController.match(
      (req) => req.url.startsWith(`${url}?i=`) && req.url.includes(`&apiKey=${apiKey}`)
    );
  
    movieRequests.forEach((req, index) => {
      expect(req.request.method).toBe('GET');
      req.flush(movieDetails[index]);
    });
  });
  

  it('should return featured movies', () => {
    const featuredMovie1: Movie = mockMovies()[0] as Movie;
    const featuredMovie2: Movie = mockMovies()[1] as Movie;

    appService.getFeaturedMovies().subscribe((result) => {
      expect(result).toEqual([featuredMovie1, featuredMovie2]);
    });

    const movieRequests = httpTestingController.match(
      (req) => req.url.startsWith(`${url}?i=`) && req.url.includes(`&apiKey=${apiKey}`)
    );

    expect(movieRequests.length).toBe(2);
    expect(movieRequests[0].request.method).toBe('GET');
    expect(movieRequests[1].request.method).toBe('GET');

    movieRequests[0].flush(featuredMovie1);
    movieRequests[1].flush(featuredMovie2);
  });
});

function mockMovies() {
  return [{
    Poster: 'poster1.jpg',
    Title: 'Movie 1',
    Type: 'Type 1',
    Year: '2022',
    Rated: 'PG-13',
    Genre: 'Action',
    Director: 'Director 1',
    Actors: 'Actor 1',
    Plot: 'Plot 1',
    Awards: 'Awards 1',
    imdbID: '1',
    Website: ''
  },
  {
    Poster: 'poster2.jpg',
    Title: 'Movie 2',
    Type: 'Type 2',
    Year: '2022',
    Rated: 'PG-13',
    Genre: 'Action',
    Director: 'Director 2',
    Actors: 'Actor 2',
    Plot: 'Plot 2',
    Awards: 'Awards 2',
    imdbID: '2',
    Website: ''
  }]
}
