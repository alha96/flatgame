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
    this.route.params.subscribe(params => {
      this.flatService.getFlatById(params['joinid']).subscribe(flat => {
        this.flatname = flat.name;
        this.flatdescription = flat.description;
      });
    });

  }

  joinFlat(){

  }

}
