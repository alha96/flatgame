export class TaskItem {
  public name: string;
  public description: string;
  public icon: string;
  public points: number;
  public done: boolean;
  public frequency: number; // -1 is irregular task
  public frequencyType: string;
  public gracePeriod: number;
  public gracePeriodType: string;
  public lastDoneDate: string;
  public lastDoneUser: string;

  // constructor for non-detail components
  constructor (name: string, points: number, done: boolean, icon: string) {
    this.name = name;
    this.points = points;
    this.done = done;
    this.icon = icon;
  }


}
