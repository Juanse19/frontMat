import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Cl1_4Component } from './cl1.4.component';

describe('Cl1_4Component', () => {
  let component: Cl1_4Component;
  let fixture: ComponentFixture<Cl1_4Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Cl1_4Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Cl1_4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
