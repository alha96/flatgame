import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskDetailItemComponent } from './task-detail-item.component';

describe('TaskDetailItemComponent', () => {
  let component: TaskDetailItemComponent;
  let fixture: ComponentFixture<TaskDetailItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskDetailItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskDetailItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
