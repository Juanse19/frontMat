import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Bhs2Component } from './bhs2.component';

describe('Bhs2Component', () => {
  let component: Bhs2Component;
  let fixture: ComponentFixture<Bhs2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Bhs2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Bhs2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
