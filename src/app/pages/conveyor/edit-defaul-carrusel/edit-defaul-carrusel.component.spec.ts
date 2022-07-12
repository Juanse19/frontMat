import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDefaulCarruselComponent } from './edit-defaul-carrusel.component';

describe('EditDefaulCarruselComponent', () => {
  let component: EditDefaulCarruselComponent;
  let fixture: ComponentFixture<EditDefaulCarruselComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditDefaulCarruselComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditDefaulCarruselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
