import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Cl1_3Component } from './cl1.3.component';

describe('Cl1.3Component', () => {
  let component: Cl1_3Component;
  let fixture: ComponentFixture<Cl1_3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Cl1_3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Cl1_3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
