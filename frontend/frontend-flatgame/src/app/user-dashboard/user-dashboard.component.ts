import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {UserItem} from "../models/user-item.module";

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {
  user : UserItem;

  constructor(private route: ActivatedRoute) {

  }

  ngOnInit() {
    let userId = this.route.snapshot.params['userid'];
    if (userId == null){
      //load current user
      //TEMPORARY
      this.user = new UserItem("1", "Emily", "emmi@gmail.com", "https://randomuser.me/api/portraits/women/2.jpg", 43);
    } else {

    }
  }

}
