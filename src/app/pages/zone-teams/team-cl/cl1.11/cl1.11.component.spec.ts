import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Cl1_11Component } from './cl1.11.component';

describe('Cl1_11Component', () => {
  let component: Cl1_11Component;
  let fixture: ComponentFixture<Cl1_11Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Cl1_11Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Cl1_11Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
