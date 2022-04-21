import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Osr1_3Component } from './osr1.3.component';

describe('Osr1_3Component', () => {
  let component: Osr1_3Component;
  let fixture: ComponentFixture<Osr1_3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Osr1_3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Osr1_3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
