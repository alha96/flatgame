export class Flat {
  name: string;
  _id: string;
  image: string;
  description: string;
  tasks: [{
    _id: string;
  }];
  members: [{
    user: string;
    _id: string;
    isAdmin: boolean;
  }];
}
