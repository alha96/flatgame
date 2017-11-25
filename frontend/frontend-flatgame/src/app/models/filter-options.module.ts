import {UserItem} from "./user-item.module";
import {TaskItem} from "./task-item.module";
/**
 * Created by psudh on 11/25/2017.
 */
export class FilterOptions{
  taskTypes: TaskItem[];
  user: UserItem;
  timeMin: Date;
  timeMax: Date;
  pointsMin: Number;
  pointsMax: Number;

  constructor(taskTypes: TaskItem[], user: UserItem){
    this.taskTypes = taskTypes;
    this.user = user;
  }

  //NOT COMPLETE!!!
  toString(){
    return "user: " + this.user.username;
  }
}
