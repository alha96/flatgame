import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AbsenceItem} from "../../../models/absence-item.module";
import {FormControl} from "@angular/forms";
import {MatSnackBar} from "@angular/material";

@Component({
  selector: 'app-abscense-item',
  templateUrl: './abscense-item.component.html',
  styleUrls: ['./abscense-item.component.css']
})
export class AbscenseItemComponent implements OnInit {

  @Input() absenceInfo : AbsenceItem;
  @Output() updatedAbsenceValues = new  EventEmitter<AbsenceItem>();
  isEditing = false;

  //editing Attributes
  dateStartControl = new FormControl(new Date());
  dateEndControl = new FormControl(new Date);

  getFormated(d : Date){
    return d.getUTCDate() + "." +
      (d.getUTCMonth() + 1) + "." +
      d.getUTCFullYear();

  }

  getDaysUntilString(){
    let daysUntilStart = this.getDaysDiff(this.absenceInfo.start);
    let daysUntilEnd = this.getDaysDiff(this.absenceInfo.end);
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
    return (diffDate.valueOf()-today.valueOf())/1000/60/60/24;
  }

  getStartMinDate(){
    return new Date();
  }

  onSaveChangesClicked(){
    if (this.dateStartControl.value > this.dateEndControl.value){
     this.snackBar.open('Enddatum muss nach Startdatum liegen.');
     return;
    }
    this.absenceInfo.start = this.dateStartControl.value;
    this.absenceInfo.end = this.dateEndControl.value;
    this.absenceInfo.start.setHours(0,-this.absenceInfo.start.getTimezoneOffset(),0,0);
    this.absenceInfo.end.setHours(0,-this.absenceInfo.end.getTimezoneOffset(),0,0);
    this.isEditing = false;
    this.updatedAbsenceValues.emit(this.absenceInfo);

  }
  onMenuEditClicked(){
    this.isEditing = !this.isEditing;
    if (this.isEditing){
      //just started editing. Set object to saved/default
      this.dateStartControl = new FormControl(this.absenceInfo.start);
      this.dateEndControl = new FormControl(this.absenceInfo.end);
    } else {
      if (this.absenceInfo.id == null){
        //if new item and then discard changes is clicked
        this.updatedAbsenceValues.emit(null);
      }
    }
  }

  onMenuDeleteClicked(){
    this.updatedAbsenceValues.emit(null);
  }


  constructor(public snackBar: MatSnackBar) {

  }

  ngOnInit() {
    if (this.absenceInfo.id == null){
      //new Task being added
      this.isEditing = true;
    }
  }

}
