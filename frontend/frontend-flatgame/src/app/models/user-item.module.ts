export class UserItem {
  public id: string;
  public username: string;
  public email: string;
  public profile_image: string;
  public points: number;
  public flat: string;
  public wgRang: number;
  public wgNumMembers: number;
  public wgMaxPoints: number;


  constructor(id: string, username: string, profile_image?: string, points?: number) {
    this.id = id;
    this.username = username;
    this.profile_image = profile_image;
    this.points = points;
  }


}
