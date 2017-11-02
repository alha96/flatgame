import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsWgComponent } from './settings-wg.component';

describe('SettingsWgComponent', () => {
  let component: SettingsWgComponent;
  let fixture: ComponentFixture<SettingsWgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingsWgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsWgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
