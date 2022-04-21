import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Cl1_14Component } from './cl1.14.component';

describe('Cl1_14Component', () => {
  let component: Cl1_14Component;
  let fixture: ComponentFixture<Cl1_14Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Cl1_14Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Cl1_14Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
