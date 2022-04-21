import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EdsstatisticsComponent } from './edsstatistics.component';

describe('EdsstatisticsComponent', () => {
  let component: EdsstatisticsComponent;
  let fixture: ComponentFixture<EdsstatisticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EdsstatisticsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EdsstatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
