import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Cl1_16Component } from './cl1.16.component';

describe('Cl1_16Component', () => {
  let component: Cl1_16Component;
  let fixture: ComponentFixture<Cl1_16Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Cl1_16Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Cl1_16Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
