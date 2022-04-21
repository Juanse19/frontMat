import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageAMSComponent } from './message-ams.component';

describe('MessageAMSComponent', () => {
  let component: MessageAMSComponent;
  let fixture: ComponentFixture<MessageAMSComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MessageAMSComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageAMSComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
