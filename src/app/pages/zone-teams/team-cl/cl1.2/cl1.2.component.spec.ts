import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Cl1_2Component } from './cl1.2.component';

describe('Cl1_2Component', () => {
  let component: Cl1_2Component;
  let fixture: ComponentFixture<Cl1_2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Cl1_2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Cl1_2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
