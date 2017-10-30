import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {UserItem} from "../../../modules/user-item.module";

@Component({
  selector: 'app-user-item',
  templateUrl: './user-item.component.html',
  styleUrls: ['./user-item.component.css']
})
export class UserItemComponent implements OnInit {

  @Input() userInfo: UserItem;
  @ViewChild('canvas_ranking') rankingCanvas: ElementRef;
  public context: CanvasRenderingContext2D;

  constructor() { }

  ngOnInit() {
    if(this.userInfo.profile_image.includes("randomuser.me")){
      var randPic = Math.floor((Math.random() * 200) + 1);
      this.userInfo.profile_image = "https://randomuser.me/api/portraits/" + (randPic > 100 ? "men" : "women") + "/" + (randPic%100) + ".jpg";
    }
  }

  drawRankingBar(percentageFilled : number){
    if (percentageFilled > 1) percentageFilled = 1;
    if (percentageFilled < 0 ) percentageFilled = 0;

    var width = this.rankingCanvas.nativeElement.width;

    this.context.strokeStyle = this.getRankingBarColor(this.userInfo);
    this.context.lineWidth = 10;
    this.context.moveTo(0,0);
    this.context.lineTo(100 * percentageFilled,0);
    this.context.stroke();
  }

  private getRankingBarColor(userInfo: UserItem){
    if (userInfo.wgRang == 1) {
      return "#4CAF50"; //green
    } else if (userInfo.wgRang == userInfo.wgNumMembers) {
      return "#F44336"; //red
    } else {
      return "#FF9800"; //yellow
    }
  }

 ngAfterViewInit() : void {
   this.context = (<HTMLCanvasElement>this.rankingCanvas.nativeElement).getContext('2d');
   this.drawRankingBar(this.userInfo.points/this.userInfo.wgMaxPoints);
}

}
