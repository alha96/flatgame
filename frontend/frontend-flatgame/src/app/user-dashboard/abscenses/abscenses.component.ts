import { Component, OnInit } from '@angular/core';
import {AbsenceItem} from "../../models/absence-item.module";

@Component({
  selector: 'app-abscenses',
  templateUrl: './abscenses.component.html',
  styleUrls: ['./abscenses.component.css']
})
export class AbscensesComponent implements OnInit {


  absences : AbsenceItem[] = [
    new AbsenceItem("2017-11-22T00:00:00-00:00", "2017-12-01T00:00:00-00:00"),
    new AbsenceItem("2017-11-29T00:00:00-00:00", "2017-12-05T00:00:00-00:00"),
    new AbsenceItem("2017-12-03T00:00:00-00:00", "2017-12-27T00:00:00-00:00"),
    new AbsenceItem("2017-12-05T00:00:00-00:00", "2017-12-27T00:00:00-00:00")
  ];

  constructor() { }

  ngOnInit() {
    console.log(this.absences[0].durationDays);
  }

}
