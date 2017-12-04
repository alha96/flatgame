import { Component, OnInit } from '@angular/core';
import {UserService} from "../services/user.service";
import {User} from "../models/user";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  user: User;

  constructor(private userService: UserService, private http: HttpClient, private router: Router) {
    this.user = this.userService.currUser;
  }

  ngOnInit() {
  }

  logout(){
    this.http.delete("/api/auth/session");
    this.router.navigate(['/login']);
  }

}
