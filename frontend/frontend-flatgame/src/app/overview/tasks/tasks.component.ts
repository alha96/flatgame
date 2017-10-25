import {Component, Input, OnInit} from '@angular/core';
import {TaskItem} from '../../modules/task-item.module';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  taskTodoItems: TaskItem[] = [
    new TaskItem(null, 'Terasse fegen', 3, false, 'fegen', 7),
    new TaskItem(null, 'Terasse fegen', 3, false, 'fegen', 7),
    new TaskItem(null, 'Terasse pegen', 4, false, 'fegen', 7)

  ];
  taskIrregularItems: TaskItem[] = [
    new TaskItem('id_132', 'Restmüll rausbringen', 1, false, 'img', -1),
    new TaskItem('id_124', 'Gelber Sack rausbringen', 1, false, 'img', -1),
    new TaskItem('id_34', 'Bio Müll rausbringen', 1, false, 'img', -1),
  ];

  taskIrregularSelected: string;
  onIrregularTaskDone() {
    console.log('Irregular Task "' + this.taskIrregularSelected + '" is erledigt');
    this.taskIrregularSelected = null;
  }

  onTaskCompleted(taskInfo: TaskItem) {
    console.log('Clicked ' + taskInfo.name + ', state: ' + taskInfo.done);
    //this.taskTodoItems.push(taskInfo);
  }

  constructor() {
  }



  ngOnInit() {
  }

}
