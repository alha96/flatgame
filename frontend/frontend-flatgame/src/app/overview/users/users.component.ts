import { Component, OnInit } from '@angular/core';
import {UserItem} from "../../modules/user-item.module";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  userInfos: UserItem[] = [
    new UserItem("123", "TSchnee45", "https://randomuser.me/aBS@other code", 70),
    new UserItem("321", "Alex", "https://randomuser.me/api/BS@other code", 65),
    new UserItem("321", "MaxiiD", "https://randomuser.me/api/BS@other code", 20),
    new UserItem("321", "Patrick", "https://randomuser.me/api/BS@other code", 45)
  ];

  constructor() { }

  ngOnInit() {
   this.updateMembers();
  }

  private updateMembers(){
    this.userInfos = this.sortUsers(this.userInfos);
    this.userInfos = this.addRanking(this.userInfos);
  }

  onUserClicked(userItem : UserItem){
    console.log("yes");
    userItem.points += 5;
    this.userInfos.push( new UserItem("321", "Testuser", "https://randomuser.me/api/BS@other code", Math.floor(Math.random() * 101)  ));
    this.updateMembers();

  }

  private sortUsers(users: UserItem[]){
    for (var i = users.length -1; i >= 1; i--){
      for (var o = i; o < users.length ; o++){
        var first = users[o-1];
        var second = users[o];
        if (first.points < second.points){
          //swap
          users[o] = first;
          users[o-1] = second;
        } else {
          break;
        }
      }
    }
    return users;
  }
  private addRanking(users: UserItem[]) {
    for (var i = 0; i < users.length; i++){
      users[i].wgRang = i+1;
      users[i].wgNumMembers = users.length;
      users[i].wgMaxPoints = users[0].points;
    }
    return users;
  }
  // sortUsers(users: UserItem[]){
  //   //BAM! First try sorting algorithm ;)
  //   for (var i = 1; i < users.length; i++){
  //     for (var o = i; o > 0; o--){
  //       var first = users[o-1];
  //       var second = users[o];
  //       if (first.points > second.points){
  //         //swap
  //         users[o] = first;
  //         users[o-1] = second;
  //       }
  //     }
  //   }
  //   return users;
  // }


}
