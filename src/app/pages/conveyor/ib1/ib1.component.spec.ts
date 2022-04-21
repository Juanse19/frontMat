import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Ib1Component } from './ib1.component';

describe('Ib1Component', () => {
  let component: Ib1Component;
  let fixture: ComponentFixture<Ib1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Ib1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Ib1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
