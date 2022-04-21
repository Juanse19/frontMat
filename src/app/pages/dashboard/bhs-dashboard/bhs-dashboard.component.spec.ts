import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BhsDashboardComponent } from './bhs-dashboard.component';

describe('BhsDashboardComponent', () => {
  let component: BhsDashboardComponent;
  let fixture: ComponentFixture<BhsDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BhsDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BhsDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
