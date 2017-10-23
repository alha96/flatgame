import { Component, OnInit } from '@angular/core';
import {TaskItem} from '../../modules/task-item.module';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  taskTodoItems: TaskItem[] = [
    new TaskItem('Terasse fegen', 3, false, 'fegen'),
    new TaskItem('Terasse pegen', 4, false, 'fegen')

  ];


  constructor() { }



  ngOnInit() {
  }

}
