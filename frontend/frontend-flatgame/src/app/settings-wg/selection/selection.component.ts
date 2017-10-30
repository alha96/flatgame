import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-selection',
  templateUrl: './selection.component.html',
  styleUrls: ['./selection.component.css']
})
export class SelectionComponent implements OnInit {

  membersColor = null;
  tasksColor = "primary";
  settingsColor = null;

  constructor() { }

  ngOnInit() {
  }

  btnClicked(btnIndex : number){
    this.membersColor = this.tasksColor = this.settingsColor = null;
    switch (btnIndex){
      case 0:
        this.membersColor = "primary";
        break;
      case 1:
        this.tasksColor = "primary";
        break;
      case 2:
        this.settingsColor = "primary";
        break;
    }
  }

}
