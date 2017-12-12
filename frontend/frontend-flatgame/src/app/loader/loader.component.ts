import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {InterceptorService} from "../services/interceptor.service";

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit, OnDestroy {

  private _showSpinner: boolean;
  private _subscription: Subscription;

  constructor(private interceptorService: InterceptorService) { }

  ngOnInit() {
    this._subscription = this.interceptorService.hasPendingRequests.subscribe(hasPendingRequests => {
      this._showSpinner = hasPendingRequests;
    });
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }
}
