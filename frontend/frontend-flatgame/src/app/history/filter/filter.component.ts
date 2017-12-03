import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl} from "@angular/forms";
import {TaskItem} from "../../models/task-item.module";
import {ConstIcons} from "../../constants/icons";
import {UserItem} from "../../models/user-item.module";
import {HistoryFilterOptions} from "../../models/filter-options.module";

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
  /*
  attributes to filter
   - name
   - checkboxes by whom
   - num points (min, max)
   - time range (min, max)
  */
export class FilterComponent implements OnInit {

  // @Output() updatedFilter = new EventEmitter<Number>();
  @Output() updatedFilter = new EventEmitter<HistoryFilterOptions>();


  filterOptions : HistoryFilterOptions;

  taskList: TaskItem[] = [
    new TaskItem("1", 'Blumen gießen', null, 3, false, 'toilet_bowl'),
    new TaskItem("2", 'Handtücher waschen', null, 3, false, 'soap'),
    new TaskItem("3", 'Badewanne wischen', null, 3, false, 'bathtub'),
    new TaskItem("4", 'Staubsaugerbeutel wechseln', null, 3, false ,'shower'),
    new TaskItem("5", 'Flur Staubsaugen', null, 3, false, 'toilet_paper'),
  ];

  userList : UserItem[] = [
    new UserItem("0", "Alle"),
    new UserItem("1", "Nick"),
    new UserItem("2", "Pat"),
    new UserItem("3", "Mike"),
  ];

  userFilterSelection : UserItem;

  icons = new ConstIcons();
  getIconLocation(id : string) : string{
    return this.icons.getIconLocation(id)
  }



   onTaskChoiceChange(){
    console.log("Changed!!");
  }

  onFilterUpdateClicked(){
    //FOR WHATEVER REASON JUST CHANGING THE VALUES IN THE OBJECT DOES NOT WORK. BUGGG
     //this.updatedFilter.emit(new HistoryFilterOptions(this.taskList, this.userFilterSelection));
    //TODO Change lists to only ID arrays
  }
  constructor() { }

  ngOnInit() {

    //get from backend
    //set task choice to all available tasks
    // this.taskChoice.setValue(this.taskList);
    // this.taskChoice.registerOnChange(function(){
    //   console.log("Changed!!");
    //
    // });
    this.userFilterSelection = this.userList[0];
    // this.taskChoice;
    // this.taskChoice[0] = this.taskList[1];
    // this.done = true;
    //TODO Reinsert with array
    //this.filterOptions = new HistoryFilterOptions(this.taskList, this.userFilterSelection);
     this.updatedFilter.emit(this.filterOptions);

  }

}
