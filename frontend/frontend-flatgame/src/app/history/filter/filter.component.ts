import { Component, OnInit } from '@angular/core';
import {FormControl} from "@angular/forms";
import {TaskItem} from "../../models/task-item.module";

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {

  /*
  attributes to filter
   - name
   - checkboxes by whom
   - num points
   - time range (min, max)
  */

  taskChoice = new FormControl();
  tasks = [
    "Toilette putzen",
    "Spühlmaschine ausräumen",
    "Foo BAR"
  ];

  // tasks = new TaskItem[] [
  //   new TaskItem(name: "Toilette putzen" , icon: "soap" )
  //   ];


  constructor() { }

  ngOnInit() {
    //set task choice to all available tasks
    this.taskChoice.setValue(this.tasks);
  }

}
