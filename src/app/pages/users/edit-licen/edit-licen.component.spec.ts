import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditLicenComponent } from './edit-licen.component';

describe('EditLicenComponent', () => {
  let component: EditLicenComponent;
  let fixture: ComponentFixture<EditLicenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditLicenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditLicenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
