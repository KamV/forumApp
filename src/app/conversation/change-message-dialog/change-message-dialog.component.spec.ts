import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeMessageDialogComponent } from './change-message-dialog.component';

describe('ChangeMessageDialogComponent', () => {
  let component: ChangeMessageDialogComponent;
  let fixture: ComponentFixture<ChangeMessageDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeMessageDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeMessageDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
