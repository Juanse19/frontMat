import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Cl1_15Component } from './cl1.15.component';

describe('Cl1_15Component', () => {
  let component: Cl1_15Component;
  let fixture: ComponentFixture<Cl1_15Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Cl1_15Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Cl1_15Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
