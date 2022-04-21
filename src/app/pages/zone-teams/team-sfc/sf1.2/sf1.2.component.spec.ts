import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Sf1_2Component } from './sf1.2.component';

describe('Sf1_2Component', () => {
  let component: Sf1_2Component;
  let fixture: ComponentFixture<Sf1_2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Sf1_2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Sf1_2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
