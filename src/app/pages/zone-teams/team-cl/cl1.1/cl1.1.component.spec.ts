import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Cl1_1Component } from './cl1.1.component';

describe('Cl1.1Component', () => {
  let component: Cl1_1Component;
  let fixture: ComponentFixture<Cl1_1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Cl1_1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Cl1_1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
