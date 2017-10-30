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
  public dueDate: Date;
  public lastDoneDate: Date; // may be null if never done
  public lastDoneUserName: string; // may be null if never done
  public lastDoneUserId: string; // may be null if never done


  constructor (id: string, name: string, description: string, points: number, done: boolean, icon: string, frequency: number, frequencyType: number,  graceDays: number, dueDate: string, lastDoneDate: string, lastDoneUserName: string, lastDoneUserId: string ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.points = points;
    this.done = done;
    this.icon = icon;
    this.frequency = frequency;
    this.frequencyType = frequencyType;
    this.graceDays = graceDays;
    this.dueDate = new Date(dueDate);
    this.lastDoneDate = new Date(lastDoneDate);
    this.lastDoneUserName = lastDoneUserName;
    this.lastDoneUserId = lastDoneUserId;

  }


}
