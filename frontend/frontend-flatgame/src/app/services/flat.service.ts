import { Injectable } from '@angular/core';
import {Flat} from "../models/flat";
import {Router} from "@angular/router";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {UserService} from "./user.service";
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of'; //proper way to import the 'of' operator
import 'rxjs/add/operator/share';
import {Settings} from "../constants/settings";
import {UserItem} from "../models/user-item.module";
import {forkJoin} from "rxjs/observable/forkJoin";
import {User} from "../models/user";
import {MessageService} from "./message.service";
import {TaskService} from "./task.service";
import {TaskItem} from "../models/task-item.module";


@Injectable()
export class FlatService {

  constructor(private router: Router,
              private http: HttpClient,
              private userService: UserService,
              private messageService: MessageService,
              private taskService: TaskService) {

    if(Settings.defaultData){
      this._currFlat = {
        name: "Meine Demo WG",
        _id: "123456789",
        image: "https://purplepzzzzdbt.weebly.com/uploads/5/3/2/4/53240413/7069678_orig.png",
        description: "Eine tolle WG in der sich alle um die Tasks prügeln. Leider nur eine default WG",
        tasks: null,
        members: null
      };
    }
  }

  private demoFlat  = {
    name: "Meine Demo WG",
    image: "https://purplepzzzzdbt.weebly.com/uploads/5/3/2/4/53240413/7069678_orig.png",
    description: "Die beste WG der Welt!"
  }

  private demoTask1 = {
    name: "Bad putzen",
    description: "Waschbecken, Toilete und Dusche putzen",
    icon: "shower",
    points: 2,
    done: false,
    frequency: 1, // -1 is irregular task
    frequencyType: 1, //0 = days, 1 = weeks, 2 = months
    graceDays: 7
  }

  private demoTask2 = {
    name: "Toiletenpapier kaufen",
    description: "Bitte mindestens 4 Lagen",
    icon: "toilet_paper",
    points: 2,
    done: false,
    frequency: -1, // -1 is irregular task
    graceDays: 7
  }

  //TODO Remove the default flat object
  private _currFlat: Flat;
  private observable: Observable<Flat>;


  set currFlat(flat: Flat){
    this._currFlat = flat;
  };
  get currFlat(): Flat {
    return this._currFlat;
  };

  getFlat(): Observable<Flat> {
    //console.log("GetFlat: " + this.userService.currUser.flat);
    if(this._currFlat) {
      return Observable.of(this._currFlat);
    } else if(this.observable) {
      return this.observable;
    } else {
      this.observable = this.http.get<Flat>(
        "/api/flat/" + this.userService.currUser.flat,
        {headers: new HttpHeaders().set('Content-Type', 'application/json')})
        .map(response =>  {
          this.observable = null;
          return response;
        })
        .share();
      return this.observable;
    }
  }

  getFlatById(id: String): Observable<Flat> {
    console.log("GetFlat: " + id);
    this.observable = this.http.get<Flat>(
      "/api/flat/" + id,
      {headers: new HttpHeaders().set('Content-Type', 'application/json')})
      .map(response =>  {
        this.observable = null;
        return response;
      })
      .share();
    return this.observable;
  }

  public createFlat(flatname: string){
    this.demoFlat.name = flatname;
    this.http.post("/api/flat", this.demoFlat, {headers: new HttpHeaders().set('Content-Type', 'application/json')}).subscribe(data => {
      console.log(data);
      let req1 = this.http.post("/api/task", this.demoTask1);
      let req2 = this.http.post("/api/task", this.demoTask2);
      forkJoin([req1, req2]).subscribe(res =>{
        this.router.navigate(['overview']);
      }, err => {
        console.log(err);
        this.messageService.displayMessage("Fehler beim generieren der Beispiel Tasks!");
      });
    }, err => {
      console.log(err);
      this.messageService.displayMessage("Es konnte leider keine WG erstellt werden!");
    });
  }

  public joinFlatById(id: String): Observable<[Flat, User]> {
    let req1 = this.http.put<Flat>("/api/flat/" + id + "/user/" + this.userService.currUser._id, {isAdmin: false});
    let req2 = this.http.put<User>("/api/user/" + this.userService.currUser._id, {flat: id});
    return forkJoin([req1, req2]);
  }

}
