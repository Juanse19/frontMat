import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BhsSalidasComponent } from './bhs-salidas.component';

describe('BhsSalidasComponent', () => {
  let component: BhsSalidasComponent;
  let fixture: ComponentFixture<BhsSalidasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BhsSalidasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BhsSalidasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
