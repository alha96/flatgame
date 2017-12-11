import {Component, Input, OnInit} from '@angular/core';
import {TaskItem} from "../../models/task-item.module";
import {TaskService} from "../../services/task.service";

@Component({
  selector: 'app-tasks-detail',
  templateUrl: './tasks-detail.component.html',
  styleUrls: ['./tasks-detail.component.css']
})
export class TasksDetailComponent implements OnInit {

  taskItems: TaskItem[] = [
    new TaskItem("123", "Dachboden prüfen", "Alle Ecken des Dachbodens durchleuch", 3, false, "bathtub", 3, 2, 7, "21.02.2018", null, null, null),
    new TaskItem("123", "Dachboden prüfen", "Alle Ecken des Dachbodens durchleuchten und schauen ob sich jemand dort befindet oder Spuren hinterlassen hat", 3, false, "soap", 1, 2, 7, "21.02.2018", null, null, null),
    new TaskItem("123", "Dachboden prüfen", "Alle Ecken des Dachbodens durchleuchten und schauen ob sich jemand dort befindet oder Spuren hinterlassen hat", 3, false, "transportasstion", 1, 2, 7, "21.02.2018", null, null, null)
  ];

  onAddFabClicked(){
    this.taskItems.push( new TaskItem(null, "", "", null, false, null, null, null, null, null, null, null, null));
    // this.taskItems.push(new TaskItem(null, "dsd", "", null, null, null, null, null, null, null, null, null, null));
  }

  onTaskAddedOrChanged(info : TaskItem){
    console.log("Arrived " + info.name);
  }



  constructor( private clientTaskService : TaskService) {

  }

  ngOnInit() {
    console.log("Hi");
    this.clientTaskService.postCreateTask(this.taskItems[1]).subscribe(ret => {
      console.log("qwert" + ret.name);
    });
  }

}
