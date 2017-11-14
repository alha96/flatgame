import {Component, OnInit} from '@angular/core';
import {TaskItem} from "../../modules/task-item.module";

@Component({
  selector: 'app-tasks-detail',
  templateUrl: './tasks-detail.component.html',
  styleUrls: ['./tasks-detail.component.css']
})
export class TasksDetailComponent implements OnInit {

  taskItems: TaskItem[] = [
    new TaskItem("123", "Dachboden prüfen", "Alle Ecken des Dachbodens durchleuch", 3, false, "fingerprint", 1, 2, 7, "21.02.2018", null, null, null),
    new TaskItem("123", "Dachboden prüfen", "Alle Ecken des Dachbodens durchleuchten und schauen ob sich jemand dort befindet oder Spuren hinterlassen hat", 3, false, "fingerprint", 1, 2, 7, "21.02.2018", null, null, null),
    new TaskItem("123", "Dachboden prüfen", "Alle Ecken des Dachbodens durchleuchten und schauen ob sich jemand dort befindet oder Spuren hinterlassen hat", 3, false, "fingerprint", 1, 2, 7, "21.02.2018", null, null, null)
  ];

  constructor() { }

  ngOnInit() {
  }

}