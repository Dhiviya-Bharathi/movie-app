import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReadMoreComponent } from './read-more.component';

describe('ReadMoreComponent', () => {
  let fixture: ComponentFixture<ReadMoreComponent>;
  let component: ReadMoreComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReadMoreComponent],
    });

    fixture = TestBed.createComponent(ReadMoreComponent);
    component = fixture.componentInstance;
  });

  it('should create the ReadMoreComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should display the content when it is short and not apply "Read more" link', () => {
    component.content = 'Short content';
    fixture.detectChanges();

    const paragraph = fixture.nativeElement.querySelector('p');
    expect(paragraph.textContent).toContain('Short content');

    const readMoreLink = fixture.nativeElement.querySelector('a');
    expect(readMoreLink).toBeFalsy();
  });

  it('should display the content and "Read more" link when content is long', () => {
    component.content = 'Long content that exceeds 200 characters. Long content that exceeds 200 characters. Long content that exceeds 200 characters. Long content that exceeds 200 characters. Long content that exceeds 200 characters.'; 
    fixture.detectChanges();

    const paragraph = fixture.nativeElement.querySelector('p');
    expect(paragraph.textContent).toContain('Long content that exceeds 200 characters. Long content that exceeds 200 characters. Long content that exceeds 200 characters. Long content that exceeds 200 characters. Long content that exceeds 200 ch');

    const readMoreLink = fixture.nativeElement.querySelector('a');
    expect(readMoreLink).toBeTruthy();
    expect(readMoreLink.textContent).toContain('Read more');
  });

  it('should toggle "Read more" to "Read less" when the link is clicked', () => {
    component.content = 'Long content that exceeds 200 characters. Long content that exceeds 200 characters. Long content that exceeds 200 characters. Long content that exceeds 200 characters. Long content that exceeds 200 characters.';
    fixture.detectChanges();

    const readMoreLink = fixture.nativeElement.querySelector('a');
    expect(component.isReadMore).toBe(true);

    readMoreLink.click();
    fixture.detectChanges();
    expect(component.isReadMore).toBe(false);

    readMoreLink.click();
    fixture.detectChanges();
    expect(component.isReadMore).toBe(true);
  });
});
