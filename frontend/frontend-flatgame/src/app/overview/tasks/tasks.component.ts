import {Component, OnInit} from '@angular/core';
import {TaskItem} from '../../models/task-item.module';
import {Observable} from "rxjs/Observable";
import {TaskService} from "../../services/task.service";
import {MessageService} from "../../services/message.service";

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  tasks: Observable<TaskItem[]>;

  taskTodoItems: TaskItem[] = [
    // new TaskItem(null, 'Blumen', 'desc', 3, false, 'spa', 7, 0, 1, '2017-11-22T00:00:00-00:00', '2017-11-22T00:00:00-00:00', 'Pat', '1234'),
    // new TaskItem(null, 'Einkaufen gehen', 'desc', 2, false, 'local_grocery_store', 7, 0, 15, '2017-11-22T00:00:00-00:00', '2017-11-22T00:00:00-00:00', 'Pat', '1234'),
    // new TaskItem(null, 'Terasse pegen', 'desc', 4, false, 'local_bar', 7, 0, 3, '2017-11-22T00:00:00-00:00', '2017-11-22T00:00:00-00:00', 'Pat', '1234')
  ];
  taskIrregularItems: TaskItem[] = [
  // new TaskItem('id_132', 'Restmüll rausbringen', 1, false, 'img', -1),
  // new TaskItem('id_124', 'Gelber Sack rausbringen', 1, false, 'img', -1),
  // new TaskItem('id_34', 'Bio Müll rausbringen', 1, false, 'img', -1),
  ];

  taskIrregularSelected: string;

  constructor(private taskService: TaskService, private messageService: MessageService) {
  }

  onIrregularTaskDone() {
    console.log('Irregular Task "' + this.taskIrregularSelected + '" is erledigt');
    this.taskIrregularSelected = null;
  }

  onTaskCompleted(taskInfo: TaskItem) {
    console.log('Clicked ' + taskInfo.name + ', state: ' + taskInfo.done);
    //this.taskItem.push(taskInfo);


  }

  onExpandClicked() {
    // for (var i = 1; i < 4; i++)
    //   this.taskTodoItems.push(new TaskItem(null, 'Terasse fegen', 'desc', i, false, 'local_bar', 7, 0, 3, '2017-11-01T00:00:00', '2017-10-28T00:00:00', 'Pat', '1234'));

  }





  ngOnInit() {
    this.tasks = this.taskService.getAllTasks();
    //for now update taskTodoItems
    this.tasks.subscribe(data => {
      data.forEach(task => {
        if(task.frequency == -1){
          this.taskIrregularItems.push(task);
        } else {
          this.taskTodoItems.push(task);
        }
        console.log(task);
      });
    }, err => {
      this.messageService.displayMessage("Fehler beim Laden der Tasks");
    });
  }

}
