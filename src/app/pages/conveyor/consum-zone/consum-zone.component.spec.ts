import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsumZoneComponent } from './consum-zone.component';

describe('ConsumZoneComponent', () => {
  let component: ConsumZoneComponent;
  let fixture: ComponentFixture<ConsumZoneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsumZoneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsumZoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
