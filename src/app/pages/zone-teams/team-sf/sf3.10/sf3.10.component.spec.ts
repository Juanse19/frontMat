import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Sf3_10Component } from './sf3.10.component';

describe('Sf3_10Component', () => {
  let component: Sf3_10Component;
  let fixture: ComponentFixture<Sf3_10Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Sf3_10Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Sf3_10Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
