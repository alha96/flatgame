import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {Location} from "@angular/common";

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {UserService} from "./services/user.service";
import {User} from "./models/user";

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private http: HttpClient, private location: Location, private userService: UserService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return new Observable<boolean>((observer) => {
      this.http.get<User>('/api/auth/session').subscribe(data => {
        console.log(data);
        this.userService.currUser = data;
        observer.next(true);
        observer.complete();
      }, err => {
        console.log(err);
        this.router.navigate(['/login'], {queryParams: {returnUrl: this.location.path()}});
        observer.next(false);
        observer.complete();
      });
    });
  }
}
