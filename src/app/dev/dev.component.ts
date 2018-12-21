import {Component, OnInit, ViewChild} from '@angular/core';
import {StickyThingDirective} from '@w11k/angular-sticky-things';

@Component({
  selector: 'demo-dev',
  templateUrl: './dev.component.html',
  styleUrls: ['./dev.component.scss']
})
export class DevComponent implements OnInit {

  marginTop = 0;
  marginBottom = 0;
  enabled = true;
  large = false;


  @ViewChild('stickyElement', {read: StickyThingDirective}) stickyElement: StickyThingDirective;

  constructor() {
  }

  ngOnInit() {
  }

  toggleSize() {
    this.large = !this.large;
    this.stickyElement.recalculate();
  }
}
