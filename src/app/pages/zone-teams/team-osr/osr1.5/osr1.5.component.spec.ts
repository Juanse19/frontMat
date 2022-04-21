import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Osr1_5Component } from './osr1.5.component';

describe('Osr1_5Component', () => {
  let component: Osr1_5Component;
  let fixture: ComponentFixture<Osr1_5Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Osr1_5Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Osr1_5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
