import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Sf3_5Component } from './sf3.5.component';

describe('Sf3_5Component', () => {
  let component: Sf3_5Component;
  let fixture: ComponentFixture<Sf3_5Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Sf3_5Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Sf3_5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
