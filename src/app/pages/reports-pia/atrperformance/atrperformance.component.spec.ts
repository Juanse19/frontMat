import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AtrperformanceComponent } from './atrperformance.component';

describe('AtrperformanceComponent', () => {
  let component: AtrperformanceComponent;
  let fixture: ComponentFixture<AtrperformanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AtrperformanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AtrperformanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
