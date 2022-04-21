import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Osr1_1Component } from './osr1.1.component';

describe('Osr1.1Component', () => {
  let component: Osr1_1Component;
  let fixture: ComponentFixture<Osr1_1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Osr1_1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Osr1_1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
