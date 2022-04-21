import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Ss1_1Component } from './ss1.1.component';

describe('Ss1_1Component', () => {
  let component: Ss1_1Component;
  let fixture: ComponentFixture<Ss1_1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Ss1_1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Ss1_1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
