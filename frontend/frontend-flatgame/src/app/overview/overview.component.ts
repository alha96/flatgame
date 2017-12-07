import { Component, OnInit } from '@angular/core';
import {Flat} from "../models/flat";
import {FlatService} from "../services/flat.service";
import {UserService} from "../services/user.service";
import {Observable} from "rxjs/Observable";

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {

  public flatOb: Observable<Flat>;

  constructor(private userService: UserService, private flatService: FlatService) { }

  ngOnInit() {
    this.flatOb = this.flatService.getFlat();
  }

}
