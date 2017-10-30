import {Component, Input, OnInit} from '@angular/core';
import {TaskItem} from '../../modules/task-item.module';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  taskTodoItems: TaskItem[] = [
    new TaskItem(null, 'Blumen gießen', 'desc', 3, false, 'spa', 7, 0, 1, '2017-10-28T00:00:00', '2017-10-28T00:00:00', 'Pat', '1234'),
    new TaskItem(null, 'Einkaufen gehen', 'desc', 2, false, 'local_grocery_store', 7, 0, 3, '2017-10-30T00:00:00', '2017-10-28T00:00:00', 'Pat', '1234'),
    new TaskItem(null, 'Terasse pegen', 'desc', 4, false, 'local_bar', 7, 0, 3, '2017-11-01T00:00:00', '2017-10-28T00:00:00', 'Pat', '1234')
  ];
  taskIrregularItems: TaskItem[] = [
  // new TaskItem('id_132', 'Restmüll rausbringen', 1, false, 'img', -1),
  // new TaskItem('id_124', 'Gelber Sack rausbringen', 1, false, 'img', -1),
  // new TaskItem('id_34', 'Bio Müll rausbringen', 1, false, 'img', -1),
  ];

  taskIrregularSelected: string;
  onIrregularTaskDone() {
    console.log('Irregular Task "' + this.taskIrregularSelected + '" is erledigt');
    this.taskIrregularSelected = null;
  }

  onTaskCompleted(taskInfo: TaskItem) {
    console.log('Clicked ' + taskInfo.name + ', state: ' + taskInfo.done);
    //this.taskTodoItems.push(taskInfo);
    if (taskInfo.done) {
      this.taskIrregularItems.push(taskInfo);
    } else {
      this.taskIrregularItems.pop();
    }

  }

  constructor() {
  }



  ngOnInit() {
  }

}
