import { Injectable } from '@angular/core';
import {Flat} from "../models/flat";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class FlatService {

  constructor(private router: Router, private http: HttpClient) { }

  //TODO Remove the default flat object
  private _currFlat: Flat = {
    name: "Meine Demo WG",
    id: "12345abcde",
    image: null,
    description: null
  };
  set currFlat(user: Flat){
    this._currFlat = user;
  };
  get currFlat(): Flat {
    return this._currFlat;
  };

  public createFlat(flatname: String){
    this.http.post("/api/flat", "" +
      "{\n" +
      "  \"name\": \"" + flatname + "\",\n" +
      "  \"id\": " + "12345" + "\n" +
      "}"
    ).subscribe(data => {
      console.log(data);
    }, err => {
      console.log(err);
    });
  }
}
