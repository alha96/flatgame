import { Component, OnInit } from '@angular/core';
import {TaskService} from "../../services/task.service";
import {TaskItem} from "../../models/task-item.module";
import {Observable} from "rxjs/Observable";

@Component({
  selector: 'app-debug',
  templateUrl: './debug.component.html',
  styleUrls: ['./debug.component.css']
})
export class DebugComponent implements OnInit {

  tasks: Observable<TaskItem[]>;

  constructor(private taskService: TaskService) { }

  ngOnInit() {
    this.tasks = this.taskService.getAllTasks();
  }

}
