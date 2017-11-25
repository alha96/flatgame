import {Component, Input, OnInit} from '@angular/core';
import {TaskItem} from "../../models/task-item.module";
import {UserItem} from "../../models/user-item.module";
import {FilterOptions} from "../../models/filter-options.module";

@Component({
  selector: 'app-tasks-history',
  templateUrl: './tasks-history.component.html',
  styleUrls: ['./tasks-history.component.css']
})
export class TasksHistoryComponent implements OnInit {

  @Input() filterTaskTypes : TaskItem[];

  taskItem: TaskItem[] = [
    new TaskItem(null, 'Blumen gießen', 'desc', 3, true, 'spa', 7, 0, 1, '2017-11-08T00:00:00', '2017-10-28T00:00:00', 'Pat', '2'),
    new TaskItem(null, 'Einkaufen gehen', 'desc', 2, true, 'local_grocery_store', 7, 0, 15, '2017-10-30T00:00:00', '2017-10-28T00:00:00', 'Pat', '2'),
    new TaskItem(null, 'Terasse pegen', 'desc', 4, true, 'local_bar', 7, 0, 3, '2017-11-01T00:00:00', '2017-10-28T00:00:00', 'Nick', '1')
  ];

  shownTaskItems : TaskItem[];

   onExpandClicked() {
    for (var i = 1; i < 4; i++)
      this.taskItem.push(new TaskItem(null, 'Terasse pegen', 'desc', 2 , true, 'local_bar', 7, 0, 3, '2017-11-01T00:00:00', '2017-10-28T00:00:00', 'IDK', i.toString()));

  }

  constructor() { }

  ngOnInit() {
     this.shownTaskItems = this.taskItem;
  }


  //////////////////FILTERING FOR HISTORY///////////////////
  private filterOptions: FilterOptions;
  @Input('updatedFilter') set inFilterOptions(value: FilterOptions){
     console.log("CHANGESFD");
    this.filterOptions = value;
    this.filterHitlist(value.taskTypes, value.user);
  };

  filterHitlist(taskTypes: TaskItem[], user: UserItem, timeMin?: Date, timeMax?: Date, pointsMin?, pointsMax?) : TaskItem[]{
    //check if tasks exist that go back until timeMin

    let hitTasks: TaskItem[] = [];
    for (let task of this.taskItem){
      //check user match
      if (+user.id != 0){
        //if 0 all users are ok
        if (user.id != task.lastDoneUserId){
          break; //else user matches
        }
      }
      // //check task match
      // let match = false;
      // for (let taskType of taskTypes){
      //   if (taskType.id == task.id){
      //     match = true;
      //     break;
      //   }
      // }
      //if no hit in taskType comparison loop task not a hit
      // if (!match) break;
      //check task done time in range
      if (timeMin != null && timeMax != null){
        if (!(task.lastDoneDate.getTime() >= timeMin.getTime() && task.lastDoneDate.getTime() <= timeMax.getTime())){
          break; //else was in time
        }
      }

      //check points in range
      if (pointsMin != null && pointsMax != null){
        if (!(task.points >= pointsMin && task.points <= pointsMax)){
          break; //else was in point range
        }
      }

      //any tasks that makes it this far has matched every requirement
      hitTasks.push(task);
    }
    this.shownTaskItems = hitTasks;
    return hitTasks;
  }


}
