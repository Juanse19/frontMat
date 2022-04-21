import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Sf3_6Component } from './sf3.6.component';

describe('Sf3_6Component', () => {
  let component: Sf3_6Component;
  let fixture: ComponentFixture<Sf3_6Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Sf3_6Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Sf3_6Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
