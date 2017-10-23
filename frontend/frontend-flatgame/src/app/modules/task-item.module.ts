export class TaskItem {
  public id: string;
  public name: string;
  public description: string;
  public icon: string;
  public points: number;
  public done: boolean;
  public frequency: number; // -1 is irregular task
  public frequencyType: number; //0 = days, 1 = weeks, 2 = months
  public graceDays: number;
  public lastDoneDate: string;
  public lastDoneUser: string;

  // constructor for non-detail components
  constructor (id: string, name: string, points: number, done: boolean, icon: string, frequency: number) {
    this.id = id;
    this.name = name;
    this.points = points;
    this.done = done;
    this.icon = icon;
    this.frequency = frequency;
    this.frequencyType = 0;
  }


}
