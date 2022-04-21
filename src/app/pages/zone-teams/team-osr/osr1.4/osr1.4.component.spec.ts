import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Osr1_4Component } from './osr1.4.component';

describe('Osr1_4Component', () => {
  let component: Osr1_4Component;
  let fixture: ComponentFixture<Osr1_4Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Osr1_4Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Osr1_4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
