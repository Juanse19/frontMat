import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchShedulerComponent } from './search-sheduler.component';

describe('SearchShedulerComponent', () => {
  let component: SearchShedulerComponent;
  let fixture: ComponentFixture<SearchShedulerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchShedulerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchShedulerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
