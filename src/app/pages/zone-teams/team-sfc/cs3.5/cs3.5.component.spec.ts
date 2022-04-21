import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Cs3_5Component } from './cs3.5.component';

describe('Cs3_5Component', () => {
  let component: Cs3_5Component;
  let fixture: ComponentFixture<Cs3_5Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Cs3_5Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Cs3_5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
