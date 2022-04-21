import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Cl1_12Component } from './cl1.12.component';

describe('Cl1_12Component', () => {
  let component: Cl1_12Component;
  let fixture: ComponentFixture<Cl1_12Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Cl1_12Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Cl1_12Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
