import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Bhs4Component } from './bhs4.component';

describe('Bhs4Component', () => {
  let component: Bhs4Component;
  let fixture: ComponentFixture<Bhs4Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Bhs4Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Bhs4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
