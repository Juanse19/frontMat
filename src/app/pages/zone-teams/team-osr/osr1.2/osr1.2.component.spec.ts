import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Osr1_2Component } from './osr1.2.component';

describe('Osr1_2Component', () => {
  let component: Osr1_2Component;
  let fixture: ComponentFixture<Osr1_2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Osr1_2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Osr1_2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
