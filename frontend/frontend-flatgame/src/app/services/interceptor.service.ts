import { Injectable } from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable, ReplaySubject} from "rxjs";
import {catchError, finalize} from "rxjs/operators";

@Injectable()
export class InterceptorService implements HttpInterceptor {

  private _requests:number = 0;
  private _hasPendingRequests:ReplaySubject<boolean> = new ReplaySubject<boolean>(1);

  get requests() {
    return this._requests;
  }

  get hasPendingRequests(): ReplaySubject<boolean> {
    return this._hasPendingRequests;
  }

  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this._requests++;

    if (1 === this._requests) {
      this._hasPendingRequests.next(true);
    }

    return next.handle(req).pipe(
      catchError(error => {
        return Observable.throw(error);
      }),
      finalize(() => {
        this._requests--;

        if (0 === this._requests) {
          this._hasPendingRequests.next(false);
        }
      })
    );
  }
}
