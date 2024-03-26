import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RouteHelperComponent } from './route-helper.component';

describe('RouteHelperComponent', () => {
  let component: RouteHelperComponent;
  let fixture: ComponentFixture<RouteHelperComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RouteHelperComponent]
    });
    fixture = TestBed.createComponent(RouteHelperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
