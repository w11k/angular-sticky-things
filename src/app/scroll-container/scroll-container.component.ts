import {Component, HostBinding, OnInit} from '@angular/core';

@Component({
  selector: 'demo-scroll-container',
  templateUrl: './scroll-container.component.html',
  styleUrls: ['./scroll-container.component.scss']
})
export class ScrollContainerComponent implements OnInit {

  @HostBinding('class') class = 'scroll-container';

  constructor() {
  }

  ngOnInit() {
  }

}
