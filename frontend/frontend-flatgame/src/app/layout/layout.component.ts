import { Component, OnInit } from '@angular/core';
import {UserService} from "../services/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  constructor(private router: Router, private userService: UserService) { }

  ngOnInit() {
    if (this.userService.currUser.flat == null){
      this.router.navigate(['create']);
    }
  }

}
