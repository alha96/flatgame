import {Component, Input, OnInit} from '@angular/core';
import {UserItem} from "../../../models/user-item.module";

@Component({
  selector: 'app-user-detail-item',
  templateUrl: './user-detail-item.component.html',
  styleUrls: ['./user-detail-item.component.css']
})
export class UserDetailItemComponent implements OnInit {

  @Input() userInfo : UserItem;
  @Input() isLast : boolean;

  onMenuMakeAdminClicked(){

  }

  onMenuChangePointsClicked(){

  }

  onMenuDeleteClicked(){

  }
  constructor() { }

  ngOnInit() {
  }

}
