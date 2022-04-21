import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemOperationComponent } from './system-operation.component';

describe('SystemOperationComponent', () => {
  let component: SystemOperationComponent;
  let fixture: ComponentFixture<SystemOperationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SystemOperationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemOperationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
