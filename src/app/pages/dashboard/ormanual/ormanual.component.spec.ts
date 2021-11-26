import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrmanualComponent } from './ormanual.component';

describe('OrmanualComponent', () => {
  let component: OrmanualComponent;
  let fixture: ComponentFixture<OrmanualComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrmanualComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrmanualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
