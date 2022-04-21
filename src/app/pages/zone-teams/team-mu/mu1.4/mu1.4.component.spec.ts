import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Mu1_4Component } from './mu1.4.component';

describe('Mu1_4Component', () => {
  let component: Mu1_4Component;
  let fixture: ComponentFixture<Mu1_4Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Mu1_4Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Mu1_4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
