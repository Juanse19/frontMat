import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Cs3_3Component } from './cs3.3.component';

describe('Cs3_3Component', () => {
  let component: Cs3_3Component;
  let fixture: ComponentFixture<Cs3_3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Cs3_3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Cs3_3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
