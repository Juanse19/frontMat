import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Sf3_11Component } from './sf3.11.component';

describe('Sf3_11Component', () => {
  let component: Sf3_11Component;
  let fixture: ComponentFixture<Sf3_11Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Sf3_11Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Sf3_11Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
