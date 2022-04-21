import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BagtagTrackingComponent } from './bagtag-tracking.component';

describe('BagtagTrackingComponent', () => {
  let component: BagtagTrackingComponent;
  let fixture: ComponentFixture<BagtagTrackingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BagtagTrackingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BagtagTrackingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
