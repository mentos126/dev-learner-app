import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DevMapEditorComponent } from './dev-map-editor.component';

describe('DevMapEditorComponent', () => {
  let component: DevMapEditorComponent;
  let fixture: ComponentFixture<DevMapEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DevMapEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DevMapEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
