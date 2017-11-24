import {Component, Input, OnInit} from '@angular/core';
import {TaskItem} from "../../models/task-item.module";
import {MatDialog} from "@angular/material";
import {DialogIconPickerComponent} from "../dialog-icon-picker/dialog-icon-picker.component";

@Component({
  selector: 'app-task-detail-item',
  templateUrl: './task-detail-item.component.html',
  styleUrls: ['./task-detail-item.component.css']
})
export class TaskDetailItemComponent implements OnInit {

  @Input() taskInfo: TaskItem;
  @Input() isLast: boolean;

  //using a copy of taskInfo so non-comitted changes do not immediatly change the internal data. Saving an Edit (if successful) changes taskInfo to the new state
  editingTaskInfo : TaskItem;
  isEditing : boolean = false;
  editingFrequencyTypeStr : string = "0";

  openIconPicker(){
    let dialog = this.dialog.open(DialogIconPickerComponent);
    dialog.afterClosed().subscribe(selection => {
      if (selection){
        console.log(selection);
        this.taskInfo.icon = selection;
      } else {
        //cancelled
        console.log("nothing");
        console.log(this.taskInfo.name);
      }
    })
  }

  onMenuEditClicked(){
    this.isEditing = !this.isEditing;
  }
  onMenuDeleteClicked(){
    console.log(this.taskInfo.frequencyType);
  }

  onSaveClicked(){
    //must assign each value individually, because the cloned object does not have the getRegularityString() method anymore (shallow clone)
    this.taskInfo.name = this.editingTaskInfo.name;
    this.taskInfo.description = this.editingTaskInfo.description;
    this.taskInfo.points = this.editingTaskInfo.points;
    this.taskInfo.icon = this.editingTaskInfo.icon;
    this.taskInfo.frequency = this.editingTaskInfo.frequency;
    //unary + operator converts string to number
    this.taskInfo.frequencyType= +this.editingFrequencyTypeStr;
    console.log(this.taskInfo.frequencyType);
    this.taskInfo.graceDays = this.editingTaskInfo.graceDays;
    //other attrinutes keep old value (dueDate, lastDone*)
  }

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
    this.taskInfo.frequencyType = 0;
    //clone data object into temp editing object
    this.editingTaskInfo = Object.assign({}, this.taskInfo);
    this.editingFrequencyTypeStr = this.editingTaskInfo.frequencyType.toString();
  }

}
