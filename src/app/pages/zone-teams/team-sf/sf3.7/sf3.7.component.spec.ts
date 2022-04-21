import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Sf3_7Component } from './sf3.7.component';

describe('Sf3_7Component', () => {
  let component: Sf3_7Component;
  let fixture: ComponentFixture<Sf3_7Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Sf3_7Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Sf3_7Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
