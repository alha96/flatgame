import {Component, Input, OnInit} from '@angular/core';
import Chart from 'chart.js';
import {UserItem} from "../../../modules/user-item.module";

@Component({
  selector: 'app-user-item',
  templateUrl: './user-item.component.html',
  styleUrls: ['./user-item.component.css']
})
export class UserItemComponent implements OnInit {

  @Input() userInfo: UserItem;

  constructor() { }

  ngOnInit() {

  }

}
