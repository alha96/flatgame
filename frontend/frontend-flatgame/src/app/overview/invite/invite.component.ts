import { Component, OnInit } from '@angular/core';
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-invite',
  templateUrl: './invite.component.html',
  styleUrls: ['./invite.component.css']
})
export class InviteComponent implements OnInit {

  flatid: String;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.flatid = this.userService.currUser.flat;
  }

}
