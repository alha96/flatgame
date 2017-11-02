import {Component, Input, OnInit} from '@angular/core';
import {TaskItem} from "../../../modules/task-item.module";

@Component({
  selector: 'app-task-detail-item',
  templateUrl: './task-detail-item.component.html',
  styleUrls: ['./task-detail-item.component.css']
})
export class TaskDetailItemComponent implements OnInit {

  @Input() taskInfo: TaskItem;
  @Input() isLast: boolean;


  constructor() { }

  ngOnInit() {
  }

}
