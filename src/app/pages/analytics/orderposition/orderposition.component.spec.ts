import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderpositionComponent } from './orderposition.component';

describe('OrderpositionComponent', () => {
  let component: OrderpositionComponent;
  let fixture: ComponentFixture<OrderpositionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderpositionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderpositionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
