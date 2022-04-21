import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Bhs1Component } from './bhs1.component';

describe('Bhs1Component', () => {
  let component: Bhs1Component;
  let fixture: ComponentFixture<Bhs1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Bhs1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Bhs1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
