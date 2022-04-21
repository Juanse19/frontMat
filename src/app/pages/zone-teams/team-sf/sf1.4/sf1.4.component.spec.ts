import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Sf1_4Component } from './sf1.4.component';

describe('Sf1_4Component', () => {
  let component: Sf1_4Component;
  let fixture: ComponentFixture<Sf1_4Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Sf1_4Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Sf1_4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
