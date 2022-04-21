import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Sf3_1Component } from './sf3.1.component';

describe('Sf3_1Component', () => {
  let component: Sf3_1Component;
  let fixture: ComponentFixture<Sf3_1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Sf3_1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Sf3_1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
