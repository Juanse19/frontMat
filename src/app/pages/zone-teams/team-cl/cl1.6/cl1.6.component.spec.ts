import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Cl1_6Component } from './cl1.6.component';

describe('Cl1_6Component', () => {
  let component: Cl1_6Component;
  let fixture: ComponentFixture<Cl1_6Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Cl1_6Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Cl1_6Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
