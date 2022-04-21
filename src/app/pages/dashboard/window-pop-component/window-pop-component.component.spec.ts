import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WindowPopComponentComponent } from './window-pop-component.component';

describe('WindowPopComponentComponent', () => {
  let component: WindowPopComponentComponent;
  let fixture: ComponentFixture<WindowPopComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WindowPopComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WindowPopComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
