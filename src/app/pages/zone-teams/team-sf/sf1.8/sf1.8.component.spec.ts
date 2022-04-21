import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Sf1_8Component } from './sf1.8.component';

describe('Sf1_8Component', () => {
  let component: Sf1_8Component;
  let fixture: ComponentFixture<Sf1_8Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Sf1_8Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Sf1_8Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
