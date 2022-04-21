import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Cs1Component } from './cs1.component';

describe('Cs1Component', () => {
  let component: Cs1Component;
  let fixture: ComponentFixture<Cs1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Cs1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Cs1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
