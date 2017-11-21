import {Component, ElementRef, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild} from '@angular/core';
import {UserItem} from "../../models/user-item.module";
import {ConstColors} from "../../constants/colors.const";


@Component({
  selector: 'app-user-item',
  templateUrl: './user-item.component.html',
  styleUrls: ['./user-item.component.css']
})
export class UserItemComponent implements OnInit {

  @Input() userInfo: UserItem;
  @Output() userClicked = new EventEmitter<UserItem>();

  // @ViewChild('canvas_ranking') rankingCanvas: ElementRef;
  // public context: CanvasRenderingContext2D;

  // private myIsReady = false;

  constructor() { }

  onUserClicked(){
    //pass to users controller components
    this.userClicked.emit(this.userInfo);
  }

  getRankingPercentage(){
    return (this.userInfo.points/this.userInfo.wgMaxPoints) * 100;
  }

  ngOnInit() {
    if(this.userInfo.profile_image.includes("randomuser.me")){
      var randPic = Math.floor((Math.random() * 200) + 1);
      this.userInfo.profile_image = "https://randomuser.me/api/portraits/" + (randPic > 100 ? "men" : "women") + "/" + (randPic%100) + ".jpg";
    }
  }

  ngOnChanges(changes: SimpleChanges) {
   // console.log(this.myIsReady);
   // if (this.userInfo.wgNumMembers > 6)
   // this.userInfo.username = "ZES";
   //  if (this.myIsReady){
   //    this.drawRankingBar(0.5);
   //  }

  }


  // drawRankingBar(percentageFilled : number){
  //   if (percentageFilled > 1) percentageFilled = 1;
  //   if (percentageFilled < 0 ) percentageFilled = 0;
  //
  //   var width = this.rankingCanvas.nativeElement.width;
  //
  //   this.context.strokeStyle = this.getRankingBarColor(this.userInfo);
  //   this.context.lineWidth = 10;
  //   this.context.moveTo(0,0);
  //   this.context.lineTo(100 * percentageFilled,0);
  //   this.context.stroke();
  // }

  getRankingBarColor(){
    if (this.userInfo.wgRang == 1 ||
      ((this.userInfo.points/this.userInfo.wgMaxPoints) > 0.9)) {
      return ConstColors.GREEN; //green
    } else if (this.userInfo.wgRang == this.userInfo.wgNumMembers) {
      return ConstColors.RED; //red
    } else {
      return ConstColors.ORANGE; //yellow
    }
  }

 ngAfterViewInit() : void {
   // this.context = (<HTMLCanvasElement>this.rankingCanvas.nativeElement).getContext('2d');
   // this.myIsReady = true;
   // console.log(this.myIsReady);
   //
   // this.drawRankingBar(this.userInfo.points/this.userInfo.wgMaxPoints);
   // this.myIsReady = true;
}

}
