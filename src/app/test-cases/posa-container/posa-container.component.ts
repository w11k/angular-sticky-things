import {Component, HostBinding, OnInit} from '@angular/core';

@Component({
  selector: 'demo-posa-container',
  templateUrl: './posa-container.component.html',
  styleUrls: ['./posa-container.component.scss']
})
export class PosaContainerComponent implements OnInit {

  @HostBinding('class') class = 'scroll-container';

  constructor() {
  }

  ngOnInit() {
  }

}
