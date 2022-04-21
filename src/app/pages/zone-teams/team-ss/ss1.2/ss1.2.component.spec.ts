import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Ss1_2Component } from './ss1.2.component';

describe('Ss1_2Component', () => {
  let component: Ss1_2Component;
  let fixture: ComponentFixture<Ss1_2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Ss1_2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Ss1_2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
