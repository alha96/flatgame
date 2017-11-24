import {IconItem} from "../models/icon-item.module";
/**
 * Created by psudh on 11/22/2017.
 */
  //@LARS: Static classes? Alternatives in TS?
export class ConstIcons{

  ICON_PATH = "assets/icons/";

  public icons : Map<string,string>;

  constructor(){
    this.icons = new Map<string,string>();
    this.icons.set("bathtub", "icons8_Bathtub_100px_7.png"            );
    this.icons.set("shower", "icons8_Shower_100px_6.png"             );
    this.icons.set("soap", "icons8_Soap_Dispenser_100px_9.png"       );
    this.icons.set("table", "icons8_Table_100px_10.png"              );
    this.icons.set("toilet_bowl", "icons8_Toilet_Bowl_100px_18.png"  );
    this.icons.set("toilet_paper", "icons8_Toilet_Paper_100px_19.png");
    this.icons.set("transportation", "icons8_Transportation_100px_27.png");
    this.icons.set("default", "icons8_Structural_100px_1.png");
  }

  public getIconsAsArray(){
    let iconsArray : IconItem[] = new Array();
    let o = 0;
    for (let key of Array.from( this.icons.keys()) ){
      iconsArray[o++] = new IconItem(key, this.icons.get(key));
    }
    return iconsArray;
  }

  public getIconLocation(id : string){
    let src = this.icons.get(id);
    if (src == null){
      src = this.icons.get("default");
    }
    return this.ICON_PATH + src;
  }

}
