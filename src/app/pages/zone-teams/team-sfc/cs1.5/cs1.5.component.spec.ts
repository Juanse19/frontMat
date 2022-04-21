import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Cs1_5Component } from './cs1.5.component';

describe('Cs1_5Component', () => {
  let component: Cs1_5Component;
  let fixture: ComponentFixture<Cs1_5Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Cs1_5Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Cs1_5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
