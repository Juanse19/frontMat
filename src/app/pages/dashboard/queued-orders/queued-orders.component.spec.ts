import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QueuedOrdersComponent } from './queued-orders.component';

describe('QueuedOrdersComponent', () => {
  let component: QueuedOrdersComponent;
  let fixture: ComponentFixture<QueuedOrdersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QueuedOrdersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QueuedOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
