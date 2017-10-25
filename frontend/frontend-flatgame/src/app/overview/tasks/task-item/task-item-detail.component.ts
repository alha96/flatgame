import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TaskItem} from '../../../modules/task-item.module';

@Component({
  selector: 'app-task-item-detail',
  templateUrl: './task-item-detail.component.html',
  styleUrls: ['./task-item-detail.component.css']
})
export class TaskItemDetailComponent implements OnInit {
  @Input() taskItemInfo: TaskItem;
  @Output() taskCompleted = new EventEmitter<TaskItem>();

  onTaskClicked() {
    this.taskItemInfo.done = !this.taskItemInfo.done;
    this.taskCompleted.emit(this.taskItemInfo);
  }
  constructor() { }

  ngOnInit() {
  }

}
