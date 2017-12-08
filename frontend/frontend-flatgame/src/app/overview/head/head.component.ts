import { Component, OnInit } from '@angular/core';
import {Flat} from "../../models/flat";
import {FlatService} from "../../services/flat.service";
import {Observable} from "rxjs/Observable";
import {MatIconRegistry} from "@angular/material";

@Component({
  selector: 'app-head',
  templateUrl: './head.component.html',
  styleUrls: ['./head.component.css']
})
export class HeadComponent implements OnInit {

  public flatOb: Observable<Flat>;
  showHide: false;
  position = 'before';

  constructor(private flatService: FlatService, private mir: MatIconRegistry) {
    mir.addSvgIcon("pen", "../../../assets/ic_create_black_24px.svg");
  }

  ngOnInit() {
    this.flatOb = this.flatService.getFlat();
  }

}
