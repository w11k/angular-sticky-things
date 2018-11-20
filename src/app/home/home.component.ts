import {Component, OnInit, OnDestroy} from '@angular/core';
import {interval, Subscription} from 'rxjs';

@Component({
  selector: 'demo-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  enableSticky = true;

  private interval: Subscription;

  constructor() {
  }

  ngOnInit() {
    this.interval = interval(10000).subscribe(() => this.enableSticky = !this.enableSticky);
  }

  ngOnDestroy() {
    this.interval.unsubscribe();
  }
}
