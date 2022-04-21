import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Bhs5Component } from './bhs5.component';

describe('Bhs5Component', () => {
  let component: Bhs5Component;
  let fixture: ComponentFixture<Bhs5Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Bhs5Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Bhs5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
