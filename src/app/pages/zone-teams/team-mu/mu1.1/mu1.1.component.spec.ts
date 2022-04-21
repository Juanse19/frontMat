import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Mu1_1Component } from './mu1.1.component';

describe('Mu1_1Component', () => {
  let component: Mu1_1Component;
  let fixture: ComponentFixture<Mu1_1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Mu1_1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Mu1_1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
