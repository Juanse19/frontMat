import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageBMComponent } from './message-bm.component';

describe('MessageBMComponent', () => {
  let component: MessageBMComponent;
  let fixture: ComponentFixture<MessageBMComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MessageBMComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageBMComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
