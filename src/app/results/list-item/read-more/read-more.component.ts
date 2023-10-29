import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-read-more',
  templateUrl: './read-more.component.html',
  styleUrls: ['./read-more.component.scss']
})
export class ReadMoreComponent implements OnInit {
  @Input() content: string = '';
  isReadMore: boolean = false;

  ngOnInit(): void {
    // Check if the content's length exceeds 200 characters and set the "Read more" flag accordingly
    this.isReadMore = this.content?.length > 200;
  }

  // Method to toggle "Read more" and "Read less" state
  toggleReadMore() {
    this.isReadMore = !this.isReadMore;
  }
}
