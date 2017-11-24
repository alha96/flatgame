import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogIconPickerComponent } from './dialog-icon-picker.component';

describe('DialogIconPickerComponent', () => {
  let component: DialogIconPickerComponent;
  let fixture: ComponentFixture<DialogIconPickerComponent>;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogIconPickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogIconPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


});
