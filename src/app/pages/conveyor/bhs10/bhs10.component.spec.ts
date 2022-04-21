import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Bhs10Component } from './bhs10.component';

describe('Bhs10Component', () => {
  let component: Bhs10Component;
  let fixture: ComponentFixture<Bhs10Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Bhs10Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Bhs10Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
