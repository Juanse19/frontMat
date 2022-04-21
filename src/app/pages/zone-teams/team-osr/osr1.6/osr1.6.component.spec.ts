import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Osr1_6Component } from './osr1.6.component';

describe('Osr1_6Component', () => {
  let component: Osr1_6Component;
  let fixture: ComponentFixture<Osr1_6Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Osr1_6Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Osr1_6Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
