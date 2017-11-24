import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from "@angular/material";
import {IconItem} from "../../models/icon-item.module";
import {ConstIcons} from "../../constants/icons";

@Component({
  selector: 'app-dialog-icon-picker',
  templateUrl: './dialog-icon-picker.component.html',
  styleUrls: ['./dialog-icon-picker.component.css']
})
export class DialogIconPickerComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DialogIconPickerComponent>) { }

  iconsconst : ConstIcons;
   icons : IconItem[];
  // icons: IconItem[] = [
  //   new IconItem("bathub", "icons8_Bathtub_100px_7.png"             ),
  //   new IconItem("shower", "icons8_Shower_100px_6.png"              ),
  //   new IconItem("soap", "icons8_Soap_Dispenser_100px_9.png"         ),
  //   new IconItem("table", "icons8_Table_100px_10.png"                 ),
  //   new IconItem("toilet_bowl", "icons8_Toilet_Bowl_100px_18.png"     ),
  //   new IconItem("toilet_paper", "icons8_Toilet_Paper_100px_19.png"     ),
  //   new IconItem("transportation", "icons8_Transportation_100px_27.png"),
  // ];
  confirmSelection() {
    this.dialogRef.close(null);
  }


  iconClicked(iconId : string){
    console.log("CLicked icon: "+  iconId)
    this.dialogRef.close(iconId);

  }

  ngOnInit() {
    this.iconsconst = new ConstIcons();
    this.icons = this.iconsconst.getIconsAsArray();

  }

}
