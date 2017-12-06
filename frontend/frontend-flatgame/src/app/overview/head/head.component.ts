import { Component, OnInit } from '@angular/core';
import {Flat} from "../../models/flat";
import {FlatService} from "../../services/flat.service";

@Component({
  selector: 'app-head',
  templateUrl: './head.component.html',
  styleUrls: ['./head.component.css']
})
export class HeadComponent implements OnInit {

  flat: Flat;

  constructor(private flatService: FlatService) { }

  ngOnInit() {
    this.flat = this.flatService.currFlat;
  }

}
