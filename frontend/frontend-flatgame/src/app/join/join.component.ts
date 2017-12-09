import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FlatService} from "../services/flat.service";
import {Flat} from "../models/flat";
import {Observable} from "rxjs/Observable";
import {UserService} from "../services/user.service";

@Component({
  selector: 'app-join',
  templateUrl: './join.component.html',
  styleUrls: ['./join.component.css']
})
export class JoinComponent implements OnInit {

  newFlatOb: Observable<Flat>;
  oldFlatOb: Observable<Flat>;
  newflat: Flat;
  oldflat: Flat;
  joinId: string;

  constructor(private route: ActivatedRoute, private  flatService: FlatService, private router: Router) { }

  ngOnInit() {
    this.joinId = this.route.snapshot.params['joinid'];
    this.oldFlatOb = this.flatService.getFlat();
    this.newFlatOb = this.flatService.getFlatById(this.joinId);

    //handle if new flat = old flat (for now just routing it back to overview)
    // this.oldFlatOb.subscribe(res => {
    //   this.newFlatOb.subscribe(res2 => {
    //     if(res._id == res2._id){
    //       this.router.navigate(['/overview']);
    //     }
    //   });
    // });
  }

  joinFlat(){
    this.flatService.joinFlatById(this.joinId).subscribe(res => {
      if(res){
        this.router.navigate(['/overview']);
      } else {
        //tbd handle error while joining flat
      }
    });
  }

}
