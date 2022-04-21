import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Mu1_2Component } from './mu1.2.component';

describe('Mu1_2Component', () => {
  let component: Mu1_2Component;
  let fixture: ComponentFixture<Mu1_2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Mu1_2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Mu1_2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
