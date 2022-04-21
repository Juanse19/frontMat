import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Sf3_9Component } from './sf3.9.component';

describe('Sf3_9Component', () => {
  let component: Sf3_9Component;
  let fixture: ComponentFixture<Sf3_9Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Sf3_9Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Sf3_9Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
