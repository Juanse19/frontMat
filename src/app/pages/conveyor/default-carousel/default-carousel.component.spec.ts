import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultCarouselComponent } from './default-carousel.component';

describe('DefaultCarouselComponent', () => {
  let component: DefaultCarouselComponent;
  let fixture: ComponentFixture<DefaultCarouselComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DefaultCarouselComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DefaultCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
