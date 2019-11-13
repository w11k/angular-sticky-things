import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';

@Component({
  selector: 'demo-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  enableSticky = true;

  constructor() {
  }

  ngOnInit() {
  }

  consoleLog(event) {
    console.log(event);
  }

  switchSticky() {
    this.enableSticky = !this.enableSticky;
  }
}
