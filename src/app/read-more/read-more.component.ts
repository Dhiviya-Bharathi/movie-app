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
    this.isReadMore = this.content.length > 200;
  }

  toggleReadMore() {
    this.isReadMore = !this.isReadMore;
  }
}
