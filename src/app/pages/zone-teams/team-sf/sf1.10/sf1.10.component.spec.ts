import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Sf1_10Component } from './sf1.10.component';

describe('Sf1_10Component', () => {
  let component: Sf1_10Component;
  let fixture: ComponentFixture<Sf1_10Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Sf1_10Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Sf1_10Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
