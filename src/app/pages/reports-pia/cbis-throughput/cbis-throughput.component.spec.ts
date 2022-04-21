import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CbisThroughputComponent } from './cbis-throughput.component';

describe('CbisThroughputComponent', () => {
  let component: CbisThroughputComponent;
  let fixture: ComponentFixture<CbisThroughputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CbisThroughputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CbisThroughputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
