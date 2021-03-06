import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TaskItem} from "../../models/task-item.module";
import {MatDialog} from "@angular/material";
import {DialogIconPickerComponent} from "../dialog-icon-picker/dialog-icon-picker.component";
import {ConstIcons} from "../../constants/icons";

@Component({
  selector: 'app-task-detail-item',
  templateUrl: './task-detail-item.component.html',
  styleUrls: ['./task-detail-item.component.css']
})
export class TaskDetailItemComponent implements OnInit {

  @Input() taskInfo: TaskItem;
  @Input() isLast: boolean;
  @Output() onTaskCreatedOrChanged = new EventEmitter<TaskItem>();


  //using a copy of taskInfo so non-comitted changes do not immediatly change the internal data. Saving an Edit (if successful) changes taskInfo to the new state
  editingTaskInfo : TaskItem;
  editingFrequencyTypeStr : string;

  //overlayVisible : boolean = false;

  onIconClicked(){
    //icon can only be changed if user has editing priviliges (is in editing pane)
    if (!this.taskInfo.isEditing) return null;
    let dialog = this.dialog.open(DialogIconPickerComponent);
    dialog.afterClosed().subscribe(selection => {
      if (selection){
        console.log(selection);
        this.editingTaskInfo.icon = selection;
      } else {
        //cancelled
        console.log("nothing");
        console.log(this.taskInfo.name);
      }
    })
  }

  onMenuEditClicked(){
    if (this.taskInfo.isEditing){
      //clicked verwerfen, reset values of temp editing Data holder
      this.editingTaskInfo = Object.assign({}, this.taskInfo);
      this.editingFrequencyTypeStr = this.editingTaskInfo.frequencyType.toString();
    }
    this.taskInfo.isEditing = !this.taskInfo.isEditing;

  }
  onMenuDeleteClicked(){
    console.log("1 " + this.taskInfo.frequency);
    console.log("2 " + this.editingTaskInfo.frequency);
    //this.overlayVisible = true;
  }


  getIcon() : string{
    return new ConstIcons().getIconLocation(this.taskInfo.icon);
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

    this.taskInfo.isEditing = false;

    this.onTaskCreatedOrChanged.emit(this.taskInfo);
  }

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
    //clone data object into temp editing object
    this.editingTaskInfo = Object.assign({}, this.taskInfo);
    this.editingFrequencyTypeStr = this.editingTaskInfo.frequencyType != null ? this.editingTaskInfo.frequencyType.toString() : '23456';
  }

}
