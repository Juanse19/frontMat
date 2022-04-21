import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Cl1_10Component } from './cl1.10.component';

describe('Cl1_10Component', () => {
  let component: Cl1_10Component;
  let fixture: ComponentFixture<Cl1_10Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Cl1_10Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Cl1_10Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
