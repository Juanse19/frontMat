import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Ss1_3Component } from './ss1.3.component';

describe('Ss1_3Component', () => {
  let component: Ss1_3Component;
  let fixture: ComponentFixture<Ss1_3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Ss1_3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Ss1_3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
