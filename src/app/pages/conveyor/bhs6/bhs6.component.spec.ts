import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Bhs6Component } from './bhs6.component';

describe('Bhs6Component', () => {
  let component: Bhs6Component;
  let fixture: ComponentFixture<Bhs6Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Bhs6Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Bhs6Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
