import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdenesNoWipsComponent } from './ordenes-no-wips.component';

describe('OrdenesNoWipsComponent', () => {
  let component: OrdenesNoWipsComponent;
  let fixture: ComponentFixture<OrdenesNoWipsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrdenesNoWipsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdenesNoWipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
