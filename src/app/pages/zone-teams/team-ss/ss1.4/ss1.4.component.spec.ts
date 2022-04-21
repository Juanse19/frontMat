import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Ss1_4Component } from './ss1.4.component';

describe('Ss1_4Component', () => {
  let component: Ss1_4Component;
  let fixture: ComponentFixture<Ss1_4Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Ss1_4Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Ss1_4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
