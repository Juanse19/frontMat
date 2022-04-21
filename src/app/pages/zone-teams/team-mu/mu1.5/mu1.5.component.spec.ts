import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Mu1_5Component } from './mu1.5.component';

describe('Mu1_5Component', () => {
  let component: Mu1_5Component;
  let fixture: ComponentFixture<Mu1_5Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Mu1_5Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Mu1_5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
