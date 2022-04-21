import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SitaMessageBMComponent } from './sita-message-bm.component';

describe('SitaMessageBMComponent', () => {
  let component: SitaMessageBMComponent;
  let fixture: ComponentFixture<SitaMessageBMComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SitaMessageBMComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SitaMessageBMComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
