import { Component, OnInit } from '@angular/core';
import {AbsenceItem} from "../../models/absence-item.module";

@Component({
  selector: 'app-abscenses',
  templateUrl: './abscenses.component.html',
  styleUrls: ['./abscenses.component.css']
})
export class AbscensesComponent implements OnInit {

  //called from absence items when something changes and must be sent to server
  absenceInfoChanged(item: number, updatedData : AbsenceItem){
    if (updatedData == null){
      //delete item from absences
      this.absences.splice(item,1);
    } else {
      //update value or add new
    console.log(item + ": " + updatedData.start.toDateString());

    }
  }

  absences : AbsenceItem[] = [
    new AbsenceItem("1", "2017-12-05T00:00:00-00:00", "2017-12-27T00:00:00-00:00")
  ];

  onAddAbsenceClicked(){
    this.absences.push(new AbsenceItem(null,null,null));
  }

  constructor() { }

  ngOnInit() {
  }

}
