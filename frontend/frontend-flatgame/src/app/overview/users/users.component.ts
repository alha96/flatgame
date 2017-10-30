import { Component, OnInit } from '@angular/core';
import {UserItem} from "../../modules/user-item.module";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  userInfos: UserItem[] = [
    new UserItem("123", "TSchnee45", "https://randomuser.me/api/portraits/men/82.jpg", 70),
    new UserItem("321", "MaxiiD", "https://randomuser.me/api/portraits/men/12.jpg", 32),
    new UserItem("321", "MaxiiD", "https://randomuser.me/api/portraits/men/12.jpg", 20),
    new UserItem("321", "MaxiiD", "https://randomuser.me/api/portraits/men/12.jpg", 45)


  ];

  constructor() { }

  ngOnInit() {
    this. userInfos = this.sortUsers(this.userInfos);
  }

  sortUsers(users: UserItem[]){
    //BAM! First try sorting algorithm ;)
    for (var i = 1; i < users.length; i++){
      for (var o = i; o > 0; o--){
        var first = users[o-1];
        var second = users[o];
        if (first.points > second.points){
          //swap
          users[o] = first;
          users[o-1] = second;
        }
      }
    }
    return users;
  }

}
