import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Bhs7Component } from './bhs7.component';

describe('Bhs7Component', () => {
  let component: Bhs7Component;
  let fixture: ComponentFixture<Bhs7Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Bhs7Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Bhs7Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
