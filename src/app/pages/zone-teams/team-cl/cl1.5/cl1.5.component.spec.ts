import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Cl1_5Component } from './cl1.5.component';

describe('Cl1_5Component', () => {
  let component: Cl1_5Component;
  let fixture: ComponentFixture<Cl1_5Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Cl1_5Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Cl1_5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
