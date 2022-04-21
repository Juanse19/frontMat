import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Bhs3Component } from './bhs3.component';

describe('Bhs3Component', () => {
  let component: Bhs3Component;
  let fixture: ComponentFixture<Bhs3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Bhs3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Bhs3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
