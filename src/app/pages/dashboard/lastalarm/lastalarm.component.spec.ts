import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LastalarmComponent } from './lastalarm.component';

describe('LastalarmComponent', () => {
  let component: LastalarmComponent;
  let fixture: ComponentFixture<LastalarmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LastalarmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LastalarmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
