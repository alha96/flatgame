import { Component, OnInit } from '@angular/core';
import {UserItem} from "../../modules/user-item.module";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  userInfos: UserItem[] = [
    new UserItem("123", "TSchnee45", "https://randomuser.me/api/portraits/men/82.jpg", 10),
    new UserItem("321", "MaxiiD", "https://randomuser.me/api/portraits/men/12.jpg", 32)
  ];

  constructor() { }

  ngOnInit() {
  }

}
