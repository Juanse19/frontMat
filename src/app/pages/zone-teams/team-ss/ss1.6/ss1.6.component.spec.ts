import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Ss1_6Component } from './ss1.6.component';

describe('Ss1_6Component', () => {
  let component: Ss1_6Component;
  let fixture: ComponentFixture<Ss1_6Component>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Ss1_6Component ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Ss1_6Component),
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
