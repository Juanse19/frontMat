import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SicSyncroComponent } from './sic-syncro.component';

describe('SicSyncroComponent', () => {
  let component: SicSyncroComponent;
  let fixture: ComponentFixture<SicSyncroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SicSyncroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SicSyncroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
