import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Mu1_3Component } from './mu1.3.component';

describe('Mu1_3Component', () => {
  let component: Mu1_3Component;
  let fixture: ComponentFixture<Mu1_3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Mu1_3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Mu1_3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
