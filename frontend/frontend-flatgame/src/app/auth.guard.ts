import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private http: Http) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.http.request('http://arkas.alnilam.uberspace.de/api/auth/session').subscribe((res: Response) => {console.log(res.json()); return res.ok;}, (err: Response) => {return false;})) {
      // logged in so return true
      console.log("");
      return true;
    }

    // not logged in so redirect to login page with the return url
    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
    return false;
  }
}
