import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BhsArrivalComponent } from './bhs-arrival.component';

describe('BhsArrivalComponent', () => {
  let component: BhsArrivalComponent;
  let fixture: ComponentFixture<BhsArrivalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BhsArrivalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BhsArrivalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
