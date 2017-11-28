import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AbscensesComponent } from './abscenses.component';

describe('AbscensesComponent', () => {
  let component: AbscensesComponent;
  let fixture: ComponentFixture<AbscensesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AbscensesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AbscensesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
