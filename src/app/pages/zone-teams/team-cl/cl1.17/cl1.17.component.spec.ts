import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Cl1_17Component } from './cl1.17.component';

describe('Cl1_17Component', () => {
  let component: Cl1_17Component;
  let fixture: ComponentFixture<Cl1_17Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Cl1_17Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Cl1_17Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
