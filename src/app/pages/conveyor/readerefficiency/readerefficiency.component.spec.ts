import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReaderefficiencyComponent } from './readerefficiency.component';

describe('ReaderefficiencyComponent', () => {
  let component: ReaderefficiencyComponent;
  let fixture: ComponentFixture<ReaderefficiencyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReaderefficiencyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReaderefficiencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
