import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SitaMessageComponent } from './sita-message.component';

describe('SitaMessageComponent', () => {
  let component: SitaMessageComponent;
  let fixture: ComponentFixture<SitaMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SitaMessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SitaMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
