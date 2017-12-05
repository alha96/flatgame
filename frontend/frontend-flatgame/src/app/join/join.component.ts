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

  constructor(private route: ActivatedRoute, private  flatService: FlatService) { }

  ngOnInit() {
    this.joinId = this.route.snapshot.params['userid'];
    this.flatService.getFlatById(this.joinId).subscribe(flat => {
      this.flatname = flat.name;
    });
  }

  joinFlat(){

  }

}
