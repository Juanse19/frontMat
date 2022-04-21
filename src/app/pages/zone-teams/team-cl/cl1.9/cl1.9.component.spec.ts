import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Cl1_9Component } from './cl1.9.component';

describe('Cl1_9Component', () => {
  let component: Cl1_9Component;
  let fixture: ComponentFixture<Cl1_9Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Cl1_9Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Cl1_9Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
