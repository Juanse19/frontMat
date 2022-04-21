import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Ib2Component } from './ib2.component';

describe('Ib2Component', () => {
  let component: Ib2Component;
  let fixture: ComponentFixture<Ib2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Ib2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Ib2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
