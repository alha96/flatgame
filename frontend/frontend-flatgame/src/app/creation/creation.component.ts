import { Component, OnInit } from '@angular/core';
import {User} from "../models/user";
import {UserService} from "../services/user.service";
import {FlatService} from "../services/flat.service";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {MatInputModule} from '@angular/material/input';

@Component({
  selector: 'app-creation',
  templateUrl: './creation.component.html',
  styleUrls: ['./creation.component.css']
})
export class CreationComponent implements OnInit {
  user: User;

  constructor(private flatService: FlatService, private userService: UserService, private http: HttpClient, private router: Router) {
    this.user = this.userService.currUser;
  }

  ngOnInit() {
  }

  logout(){
    this.http.delete("/api/auth/session").subscribe(data => {
      console.log(data);
    }, err => {
      console.log(err);
    });
    this.router.navigate(['/login']);
  }

  createNewFlat(flatname: String) {
    if(flatname != ""){
      console.log("WG mit name (" + flatname + ") wird erstellt");
      this.flatService.createFlat(flatname);
    } else {
      console.log("Der WG Name muss mindestens 4 Zeichen lang sein");
    }
  }

}
