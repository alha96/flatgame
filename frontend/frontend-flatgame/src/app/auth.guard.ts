import {Injectable} from '@angular/core';
import {Http, Headers, Response} from '@angular/http';
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private http: Http) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.http.request('http://arkas.alnilam.uberspace.de/api/auth/session').map(result => {
      return true;
    }).catch(err => {
      this.router.navigate(['/login'], {queryParams: {returnUrl: state.url}});
      return [false];
    })
  }
}
