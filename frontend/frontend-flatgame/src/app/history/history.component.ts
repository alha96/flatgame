import {Component, Input, OnInit} from '@angular/core';
import {FilterOptions} from "../models/filter-options.module";
import {UserItem} from "../models/user-item.module";
@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  // @Input() filterOptions : Number = 2;
  @Input() filterOptions : FilterOptions = new FilterOptions(null, new UserItem("10", "Pat",null,null));

  constructor() { }




  ngOnInit() {
  }

}
