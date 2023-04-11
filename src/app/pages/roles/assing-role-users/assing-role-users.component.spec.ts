import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssingRoleUsersComponent } from './assing-role-users.component';

describe('AssingRoleUsersComponent', () => {
  let component: AssingRoleUsersComponent;
  let fixture: ComponentFixture<AssingRoleUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssingRoleUsersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssingRoleUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
