import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PredictivoComponent } from './predictivo.component';

describe('PredictivoComponent', () => {
  let component: PredictivoComponent;
  let fixture: ComponentFixture<PredictivoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PredictivoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PredictivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
