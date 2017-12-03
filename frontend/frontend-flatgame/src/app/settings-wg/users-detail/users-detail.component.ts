import { Component, OnInit } from '@angular/core';
import {UserItem} from "../../models/user-item.module";

@Component({
  selector: 'app-users-detail',
  templateUrl: './users-detail.component.html',
  styleUrls: ['./users-detail.component.css']
})
export class UsersDetailComponent implements OnInit {

  users : UserItem[] = [
    new UserItem("2","Patrick","p.fooBar@gmail.com",null,34),
    new UserItem("3","sdf","p.fooBa32r@gmail.com",null,53),
    new UserItem("3","sdf","p.fooBa32r@gmail.com",null,53),
    new UserItem("3","sdf","p.fooBa32r@gmail.com",null,53),
  ];
  constructor() { }

  ngOnInit() {
  }

}
