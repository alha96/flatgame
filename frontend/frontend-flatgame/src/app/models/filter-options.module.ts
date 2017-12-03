import {UserItem} from "./user-item.module";
import {TaskItem} from "./task-item.module";
/**
 * Created by psudh on 11/25/2017.
 */
export class HistoryFilterOptions{
  taskTypeIds: string[];
  userIds: string[];
  timeMin: Date;
  timeMax: Date;
  pointsMin: Number;
  pointsMax: Number;

  constructor(taskTypes: string[], user: string[]){
    this.taskTypeIds = taskTypes;
    this.userIds = user;
  }


}
