import {Component, OnInit, ViewChild} from '@angular/core';
import {StickyThingDirective} from '../../../projects/angular-sticky-things/src/lib/sticky-thing.directive';

@Component({
  selector: 'demo-dev',
  templateUrl: './dev.component.html',
  styleUrls: ['./dev.component.scss']
})
export class DevComponent implements OnInit {

  marginTop = 0;
  marginBottom = 0;
  marginTopCss = 0;
  marginBottomCss = 0;
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
