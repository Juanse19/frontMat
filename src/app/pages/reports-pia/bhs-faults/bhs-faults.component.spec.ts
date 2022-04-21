import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BhsFaultsComponent } from './bhs-faults.component';

describe('BhsFaultsComponent', () => {
  let component: BhsFaultsComponent;
  let fixture: ComponentFixture<BhsFaultsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BhsFaultsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BhsFaultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
