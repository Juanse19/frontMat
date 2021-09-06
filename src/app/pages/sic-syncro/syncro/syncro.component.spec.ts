import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SyncroComponent } from './syncro.component';

describe('SyncroComponent', () => {
  let component: SyncroComponent;
  let fixture: ComponentFixture<SyncroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SyncroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SyncroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
