import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LlegadasBhsComponent } from './llegadas-bhs.component';

describe('LlegadasBhsComponent', () => {
  let component: LlegadasBhsComponent;
  let fixture: ComponentFixture<LlegadasBhsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LlegadasBhsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LlegadasBhsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
