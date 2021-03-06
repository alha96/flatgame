import {Component, OnInit} from '@angular/core';
import {UserItem} from "../../models/user-item.module";
import {UserService} from "../../services/user.service";
import {FlatService} from "../../services/flat.service";
import {User} from "../../models/user";
import {Flat} from "../../models/flat";
import {Settings} from "../../constants/settings";
import {MessageService} from "../../services/message.service";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  userInfos: UserItem[] = [];

  constructor(private userService: UserService, private flatService: FlatService, private messageService: MessageService) { }

  ngOnInit() {
   this.updateMembers();
  }

  private updateMembers(){
    if(Settings.defaultData){
      this.userInfos.push(new UserItem("321", "Bsp. Patrick", null, "https://randomuser.me/api/BS@other code", 45));
      this.userInfos.push(new UserItem("123", "Bsp. TSchnee45", null, "https://randomuser.me/aBS@other code", 70));
      this.userInfos.push(new UserItem("321", "Bsp. Alex", null, "https://randomuser.me/api/BS@other code", 65));
    } else {
      this.flatService.getFlat().subscribe( flat => {
        this.userInfos = [];
        flat.members.forEach(member => {
          console.log("Add new User to component with id " + member.user);
          this.userService.getUserById(member.user).subscribe(user => {
            console.log("Add new User " + user._id + ", " + user.username);
            this.userInfos.push(new UserItem(user._id, user.username, user.email, user.profile_image, 50));
          });
        });
      });
    }
    this.userInfos = this.sortUsers(this.userInfos);
    this.userInfos = this.addRanking(this.userInfos);
  }

  onUserClicked(userItem : UserItem){
    console.log("yes");
    userItem.points += 5;
   // this.userInfos.push( new UserItem("321", "Testuser", "https://randomuser.me/api/BS@other code", Math.floor(Math.random() * 101)  ));
    this.updateMembers();
    this.messageService.displayMessage("Do some stuff ;)");
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
