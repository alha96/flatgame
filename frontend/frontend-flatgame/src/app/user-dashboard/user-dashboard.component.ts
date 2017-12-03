import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {UserItem} from "../models/user-item.module";
import {HistoryFilterOptions} from "../models/filter-options.module";

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {
  user : UserItem;
  userId: string;
  crHistory : HistoryFilterOptions;

  constructor(private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.userId = this.route.snapshot.params['userid'];

    if (this.userId  == null){
      //load current user (from cookies)
      //TEMPORARY
      this.user = new UserItem("1" , "Emily", "emmi@gmail.com", "https://randomuser.me/api/portraits/women/2.jpg", 43);
    } else {
      //load user with userId
    }
    this.crHistory = new HistoryFilterOptions(null, [this.userId]);
  }

}
