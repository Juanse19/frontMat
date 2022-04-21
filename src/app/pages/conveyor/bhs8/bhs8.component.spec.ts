import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Bhs8Component } from './bhs8.component';

describe('Bhs8Component', () => {
  let component: Bhs8Component;
  let fixture: ComponentFixture<Bhs8Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Bhs8Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Bhs8Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
