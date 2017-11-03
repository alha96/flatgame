import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsDetailComponent } from './settings-detail.component';

describe('SettingsDetailComponent', () => {
  let component: SettingsDetailComponent;
  let fixture: ComponentFixture<SettingsDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingsDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
