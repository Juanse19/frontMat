import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Sf3_8Component } from './sf3.8.component';

describe('Sf3_8Component', () => {
  let component: Sf3_8Component;
  let fixture: ComponentFixture<Sf3_8Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Sf3_8Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Sf3_8Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
