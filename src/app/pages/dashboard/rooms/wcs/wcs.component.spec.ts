import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WcsComponent } from './wcs.component';

describe('WcsComponent', () => {
  let component: WcsComponent;
  let fixture: ComponentFixture<WcsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WcsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WcsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
