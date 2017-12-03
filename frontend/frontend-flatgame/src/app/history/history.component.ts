import {Component, Input, OnInit} from '@angular/core';
import {HistoryFilterOptions} from "../models/filter-options.module";
import {UserItem} from "../models/user-item.module";
@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  // @Input() filterOptions : Number = 2;
  @Input() filterOptions : HistoryFilterOptions = new HistoryFilterOptions(null,["10"]);

  constructor() { }




  ngOnInit() {
  }

}
