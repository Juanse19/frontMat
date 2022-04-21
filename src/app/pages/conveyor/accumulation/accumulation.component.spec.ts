import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccumulationComponent } from './accumulation.component';

describe('AccumulationComponent', () => {
  let component: AccumulationComponent;
  let fixture: ComponentFixture<AccumulationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccumulationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccumulationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
