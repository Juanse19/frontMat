import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Sf1_9Component } from './sf1.9.component';

describe('Sf1_9Component', () => {
  let component: Sf1_9Component;
  let fixture: ComponentFixture<Sf1_9Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Sf1_9Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Sf1_9Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
