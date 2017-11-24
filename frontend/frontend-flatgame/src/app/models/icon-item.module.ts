export class IconItem {
  //why does this not work (webstorm says attributes are private; CLI recognizes them
  //constructor (  private id : string, private filePath : string){}

  public id : string;
  public filePath : string;
  constructor(id : string, filePath: string){
    this.id = id;
    this.filePath = filePath;
  }
}
