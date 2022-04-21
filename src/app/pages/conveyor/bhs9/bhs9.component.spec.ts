import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Bhs9Component } from './bhs9.component';

describe('Bhs9Component', () => {
  let component: Bhs9Component;
  let fixture: ComponentFixture<Bhs9Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Bhs9Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Bhs9Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
