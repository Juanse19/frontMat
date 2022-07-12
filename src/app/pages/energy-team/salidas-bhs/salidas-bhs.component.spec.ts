import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalidasBhsComponent } from './salidas-bhs.component';

describe('SalidasBhsComponent', () => {
  let component: SalidasBhsComponent;
  let fixture: ComponentFixture<SalidasBhsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalidasBhsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalidasBhsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
