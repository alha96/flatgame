import {Component, Input, OnInit} from '@angular/core';
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
    this.drawRankingBar(this.userInfo.points);

    if(this.userInfo.profile_image.includes("randomuser.me")){
      var randPic = Math.floor((Math.random() * 200) + 1);
      this.userInfo.profile_image = "https://randomuser.me/api/portraits/" + (randPic > 100 ? "men" : "women") + "/" + (randPic%100) + ".jpg";
    }
  }

  drawRankingBar(percentageFilled : number){
    if (percentageFilled > 100) percentageFilled = 100;
    if (percentageFilled <0 ) percentageFilled = 0;

    var c = <HTMLCanvasElement>document.getElementById("canvas_ranking");
    var ctx = c.getContext("2d");

    var width = c.width;
    var processPx = width * (percentageFilled/100);

    ctx.strokeStyle = "#ff0000";
    ctx.lineWidth = 5;
    ctx.moveTo(0,0);
    ctx.lineTo(processPx,0);
    ctx.stroke();
  }

}
