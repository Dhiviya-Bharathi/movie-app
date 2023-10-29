import { Component, OnInit } from '@angular/core';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private appService: AppService) { }
  ngOnInit() {
    this.appService.getTopMovieResults('game').subscribe(data => {
      // Here, 'data' contains the desired attributes of the top 5 results.
      console.log(data);
    });
  }
}
