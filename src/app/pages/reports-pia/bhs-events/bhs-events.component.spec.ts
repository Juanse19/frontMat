import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BhsEventsComponent } from './bhs-events.component';

describe('BhsEventsComponent', () => {
  let component: BhsEventsComponent;
  let fixture: ComponentFixture<BhsEventsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BhsEventsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BhsEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
