/**
 * Created by psudh on 11-Dec-17.
 */

import {Injectable} from "@angular/core";
import {TaskItem} from "../models/task-item.module";
import {Observable} from "rxjs/Observable";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";


@Injectable()
export class TaskService {

  constructor(private router: Router,
              private http: HttpClient){}


  postCreateTask(flatItem : TaskItem): Observable<TaskItem> {
    console.log("CreateFlat: " + flatItem.name);
    return this.http.post<TaskItem>("/api/task/", flatItem);
  }

  getAllTasks() : Observable<TaskItem[]> {
    return this.http.get<TaskItem[]>("/api/task");
  }
}

