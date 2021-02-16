import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Beauty1Component } from './beauty1.component';

describe('Beauty1Component', () => {
  let component: Beauty1Component;
  let fixture: ComponentFixture<Beauty1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Beauty1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Beauty1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
