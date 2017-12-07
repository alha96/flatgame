import { Component, OnInit } from '@angular/core';
import {Flat} from "../../models/flat";
import {FlatService} from "../../services/flat.service";
import {Observable} from "rxjs/Observable";

@Component({
  selector: 'app-head',
  templateUrl: './head.component.html',
  styleUrls: ['./head.component.css']
})
export class HeadComponent implements OnInit {

  public flatOb: Observable<Flat>;

  constructor(private flatService: FlatService) { }

  ngOnInit() {
    this.flatOb = this.flatService.getFlat();
  }

}
