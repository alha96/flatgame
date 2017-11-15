import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  returnUrl: string;
  googleUrl: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router)
  {}

  ngOnInit() {
    //User ausloggen wenn er auf die Login Seite geht?
    //localStorage.removeItem('currentUser');
//    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    this.returnUrl = this.router.url;
    this.googleUrl = 'http://arkas.alnilam.uberspace.de/api/auth/oauth2/google?return=' + this.returnUrl;
//    this.googleUrl = 'http://arkas.alnilam.uberspace.de/api/auth/oauth2/google?return=http://localhost:4200';
  }

  login() {
//    this.router.navigate([this.googleUrl]);
    window.location.href = this.googleUrl;
  }

}
