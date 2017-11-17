import { Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable()
export class UserService {

  constructor() { }

  private _currUser: User;
  set currUser(user: User){
    this._currUser = user;
  };
  get currUser(): User {
    return this._currUser;
  };

}
