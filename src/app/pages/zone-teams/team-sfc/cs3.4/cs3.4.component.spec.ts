import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Cs3_4Component } from './cs3.4.component';

describe('Cs3_4Component', () => {
  let component: Cs3_4Component;
  let fixture: ComponentFixture<Cs3_4Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Cs3_4Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Cs3_4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
