import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TargetATRComponent } from './target-atr.component';

describe('TargetATRComponent', () => {
  let component: TargetATRComponent;
  let fixture: ComponentFixture<TargetATRComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TargetATRComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TargetATRComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
