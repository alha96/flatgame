import { Injectable } from '@angular/core';
import {Flat} from "../models/flat";
import {Router} from "@angular/router";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {UserService} from "./user.service";

@Injectable()
export class FlatService {

  constructor(private router: Router, private http: HttpClient, private userService: UserService) { }

  //TODO Remove the default flat object
  private _currFlat: Flat = {
    name: "Meine Demo WG",
    _id: "123456789",
    image: null,
    description: null,
    tasks: null,
    members: null
  };
  set currFlat(flat: Flat){
    this._currFlat = flat;
  };
  get currFlat(): Flat {
    return this.getFlatById(this.userService.currUser.flat);
  };

  public createFlat(flatname: String){
    this.http.post("/api/flat", "" +
      "{\n" +
      "  \"name\": \"" + flatname + "\",\n" +
      "}"
    , {headers: new HttpHeaders().set('Content-Type', 'application/json')}).subscribe(data => {
      console.log(data);
      this.router.navigate(['overview']);
    }, err => {
      console.log(err);
    });
  }

  public getFlatById(id: String): Flat {
    this.http.get("/api/flat/" + id).subscribe(data => {
      console.log(data);
      return data;
    }, err => {
      console.log(err);
      return null;
    });
    return null;
  }
}
