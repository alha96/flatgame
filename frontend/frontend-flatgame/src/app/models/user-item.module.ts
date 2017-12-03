export class UserItem {
  public id: string;
  public username: string;
  public email: string;
  public profile_image: string;
  public points: number;
  public flat: string;
  //probably should be saved somewhere else
  public wgRang: number;
  public wgNumMembers: number;
  public wgMaxPoints: number;
  //insert inFlat since
  //insert isAdmin
  //insert inWgSince


  constructor(id: string, username: string, email? :  string, profile_image?: string, points?: number) {
    this.id = id;
    this.username = username;
    this.profile_image = profile_image;
    this.points = points;
    this.email = email;
  }


}
