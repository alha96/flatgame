import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs/Observable";
import {Flat} from "../../models/flat";
import {FlatService} from "../../services/flat.service";
import {UserService} from "../../services/user.service";
import {User} from "../../models/user";

@Component({
  selector: 'app-invite',
  templateUrl: './invite.component.html',
  styleUrls: ['./invite.component.css']
})
export class InviteComponent implements OnInit {

  public flatOb: Observable<Flat>;
  public user: User;

  constructor(private flatService: FlatService, private userService: UserService) { }

  ngOnInit() {
    this.flatOb = this.flatService.getFlat();
    this.user = this.userService.currUser;
  }

}
