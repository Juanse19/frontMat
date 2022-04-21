import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Cl1_7Component } from './cl1.7.component';

describe('Cl1_7Component', () => {
  let component: Cl1_7Component;
  let fixture: ComponentFixture<Cl1_7Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Cl1_7Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Cl1_7Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
