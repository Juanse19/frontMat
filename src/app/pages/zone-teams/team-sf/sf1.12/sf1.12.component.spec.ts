import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Sf1_12Component } from './sf1.12.component';

describe('Sf1_12Component', () => {
  let component: Sf1_12Component;
  let fixture: ComponentFixture<Sf1_12Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Sf1_12Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Sf1_12Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
