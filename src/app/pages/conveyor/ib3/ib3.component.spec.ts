import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Ib3Component } from './ib3.component';

describe('Ib3Component', () => {
  let component: Ib3Component;
  let fixture: ComponentFixture<Ib3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Ib3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Ib3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
