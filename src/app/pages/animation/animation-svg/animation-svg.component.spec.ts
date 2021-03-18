import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimationSvgComponent } from './animation-svg.component';

describe('AnimationSvgComponent', () => {
  let component: AnimationSvgComponent;
  let fixture: ComponentFixture<AnimationSvgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnimationSvgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnimationSvgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
