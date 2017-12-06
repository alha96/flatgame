import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {FlatService} from "../services/flat.service";

@Component({
  selector: 'app-join',
  templateUrl: './join.component.html',
  styleUrls: ['./join.component.css']
})
export class JoinComponent implements OnInit {

  joinId: string;
  flatname: string = "...";
  flatdescription: string = "...";

  constructor(private route: ActivatedRoute, private  flatService: FlatService) { }

  ngOnInit() {
    this.flatname = this.flatService.currFlat.name;
    this.flatdescription = this.flatService.currFlat.description;

  }

  joinFlat(){
    this.flatService.joinFlatById(this.joinId);
  }

}
