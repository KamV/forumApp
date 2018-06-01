import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewChangeDialogComponent } from './review-change-dialog.component';

describe('ReviewChangeDialogComponent', () => {
  let component: ReviewChangeDialogComponent;
  let fixture: ComponentFixture<ReviewChangeDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReviewChangeDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewChangeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
