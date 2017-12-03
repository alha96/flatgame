/**
 * Created by psudh on 12/1/2017.
 */
export class AbsenceItem {
  public id : string;
  public start : Date;
  public end : Date;
  public durationDays : Number;

  constructor (id: string, start: string, end: string){
    this.id = id;
    this.start = new Date(start);
    this.end = new Date(end);
    this.durationDays = (this.end.valueOf() - this.start.valueOf())/1000/60/60/24;
  }
}
