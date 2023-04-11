import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EdittargetATRComponent } from './edittarget-atr.component';

describe('EdittargetATRComponent', () => {
  let component: EdittargetATRComponent;
  let fixture: ComponentFixture<EdittargetATRComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EdittargetATRComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EdittargetATRComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
