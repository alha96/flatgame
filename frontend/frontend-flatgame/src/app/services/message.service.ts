import { Injectable } from '@angular/core';
import {MatSnackBar} from "@angular/material";

@Injectable()
export class MessageService {

  constructor(public snackBar: MatSnackBar) { }

  displayMessage(mes: string){
    this.snackBar.open(mes, null,{duration: 1500});
  }

}
