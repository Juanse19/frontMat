import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Sf3_2Component } from './sf3.2.component';

describe('Sf3_2Component', () => {
  let component: Sf3_2Component;
  let fixture: ComponentFixture<Sf3_2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Sf3_2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Sf3_2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
