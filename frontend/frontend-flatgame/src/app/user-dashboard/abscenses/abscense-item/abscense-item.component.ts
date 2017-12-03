import {Component, Input, OnInit} from '@angular/core';
import {AbsenceItem} from "../../../models/absence-item.module";

@Component({
  selector: 'app-abscense-item',
  templateUrl: './abscense-item.component.html',
  styleUrls: ['./abscense-item.component.css']
})
export class AbscenseItemComponent implements OnInit {

  @Input() absence : AbsenceItem;

  getFormated(d : Date){
    console.log(d.toDateString());
    return d.getUTCDate() + "." +
      (d.getUTCMonth() + 1) + "." +
      d.getUTCFullYear();

  }

  getDaysUntilString(){
    let daysUntilStart = this.getDaysDiff(this.absence.start);
    let daysUntilEnd = this.getDaysDiff(this.absence.end);
    if (daysUntilStart > 0){
      return "in " + daysUntilStart + " Tagen";
    } else if (daysUntilStart <= 0 && daysUntilEnd >= 0){
      return "aktuell";
    } else {
      return "vor " + (-daysUntilEnd) + " Tagen";
    }
  }

  getDaysDiff(diffDate : Date) : Number{
    let today = new Date();
    //take out timezone difference because both should be in UTC
    today.setHours(0,-today.getTimezoneOffset(),0,0);
    console.log(today.toTimeString());
    return (diffDate.valueOf()-today.valueOf())/1000/60/60/24;
  }
  constructor() { }

  ngOnInit() {

  }

}
