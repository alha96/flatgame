import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TaskItem} from '../../../modules/task-item.module';
import {ConstColors} from "../../../constants/colors.const";

@Component({
  selector: 'app-task-item-detail',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.css']
})
export class TaskItemComponent implements OnInit {
  @Input() taskItemInfo: TaskItem;
  @Output() taskCompleted = new EventEmitter<TaskItem>();


  getIconColor() :string {
    var daysUntilDue = this.getDaysUntilDue(this.taskItemInfo.dueDate);

   if (daysUntilDue > 0) {
     //before due
     return ConstColors.GREEN;
   } else if (daysUntilDue > (-1 * this.taskItemInfo.graceDays)){
     //after due but before grace day ends
     return ConstColors.ORANGE;
   } else {
     //past due and grace days
     return ConstColors.RED;
   }
  }

  // problematic function because the calculation with milliseconds
  // does not respect the date change. This means that although a task
  // may have been done only 10 hours ago it was done yesterday (if
  // checked in the morning. Probably a library will be used to aid
  // with the calculations
  getLastDoneDateString() : string {
    var doneDate = this.taskItemInfo.lastDoneDate;
    var daysSince = -1 * this.getDaysUntilDue(doneDate);
 //   if (daysSince > 2){
      return doneDate.toDateString();
  //  } else if (daysSince > 1) {
    //  return "yesterday at " + doneDate.getTime().toString();
 // } else if (daysSince/24 > ){

    //}

  }

  onTaskClicked() {
    this.taskItemInfo.done = !this.taskItemInfo.done;
    this.taskCompleted.emit(this.taskItemInfo);
    console.log("Clicked taskIfnoItem");
  }
  onCheckboxClicked(){
    //this.taskItemInfo.done = !this.taskItemInfo.done;
  }

  //not always correct result, see comment at getLastDoneDate
  getDaysUntilDue(dateUntil : Date){
    var curDate = new Date();
    var millisUntilDue = dateUntil.getTime() - curDate.getTime();
    var hoursUntilDue = millisUntilDue / 1000 / 60 / 60;
    var daysUntilDue = hoursUntilDue / 24;
    return daysUntilDue;
  }

  constructor() {
  }

  ngOnInit() {
  }

}
