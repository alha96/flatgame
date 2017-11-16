import { Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable()
export class UserService {

  constructor() { }

  private users: User;
  set user(){

  };
  get user(): User {
    return null;
  };

}
