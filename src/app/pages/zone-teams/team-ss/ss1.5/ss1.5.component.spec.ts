import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Ss1_5Component } from './ss1.5.component';

describe('Ss1_5Component', () => {
  let component: Ss1_5Component;
  let fixture: ComponentFixture<Ss1_5Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Ss1_5Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Ss1_5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
