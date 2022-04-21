import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Cl1_8Component } from './cl1.8.component';

describe('Cl1_8Component', () => {
  let component: Cl1_8Component;
  let fixture: ComponentFixture<Cl1_8Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Cl1_8Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Cl1_8Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
