import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BaggagedataComponent } from './baggagedata.component';

describe('BaggagedataComponent', () => {
  let component: BaggagedataComponent;
  let fixture: ComponentFixture<BaggagedataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BaggagedataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BaggagedataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
