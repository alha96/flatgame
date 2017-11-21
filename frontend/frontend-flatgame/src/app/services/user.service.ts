import { Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable()
export class UserService {

  constructor() { }

  //TODO Remove the default user object
  private _currUser: User = {
    _id: "0",
    profile_image: "https://randomuser.me/api/portraits/men/75.jpg",
    username: "Demo User",
    googleid: "0",
    points: 0,
    flat: null,
    email: "test@test.de"
  };
  set currUser(user: User){
    this._currUser = user;
  };
  get currUser(): User {
    return this._currUser;
  };

}
