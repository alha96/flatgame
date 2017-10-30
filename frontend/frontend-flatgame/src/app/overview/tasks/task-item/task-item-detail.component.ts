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

  iconColor: string;

  getIconColor() {
    var curDate = new Date();
    var millisUntilDue = this.taskItemInfo.dueDate.getTime() - curDate.getTime();
    var hoursUntilDue = millisUntilDue / 1000 / 60 / 60;
    var daysUntilDue = hoursUntilDue / 24;

   if (daysUntilDue > 0) {
     //before due
     return 'green';
   } else if (daysUntilDue > (-1 * this.taskItemInfo.graceDays)){
     //after due but before grace day ends
     return 'orange';
   } else {
     //past due and grace days
     return 'red';
   }
  }


  onTaskClicked() {
    this.taskItemInfo.done = !this.taskItemInfo.done;
    this.taskCompleted.emit(this.taskItemInfo);
  }

  constructor() {
  }

  ngOnInit() {
    this.iconColor = this.getIconColor();

  }

}
