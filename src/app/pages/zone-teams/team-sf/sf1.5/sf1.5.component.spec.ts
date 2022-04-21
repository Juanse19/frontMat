import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Sf1_5Component } from './sf1.5.component';

describe('Sf1_5Component', () => {
  let component: Sf1_5Component;
  let fixture: ComponentFixture<Sf1_5Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Sf1_5Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Sf1_5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
