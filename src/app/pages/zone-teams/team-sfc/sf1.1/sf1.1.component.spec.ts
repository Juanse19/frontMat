import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Sf1_1Component } from './sf1.1.component';

describe('Sf1_1Component', () => {
  let component: Sf1_1Component;
  let fixture: ComponentFixture<Sf1_1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Sf1_1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Sf1_1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
