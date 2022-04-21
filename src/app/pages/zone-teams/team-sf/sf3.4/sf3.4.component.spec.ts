import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Sf3_4Component } from './sf3.4.component';

describe('Sf3_4Component', () => {
  let component: Sf3_4Component;
  let fixture: ComponentFixture<Sf3_4Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Sf3_4Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Sf3_4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
