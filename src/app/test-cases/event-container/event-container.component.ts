import {Component, OnInit, ViewChild} from '@angular/core';
import {StickyThingDirective} from '../../../../projects/angular-sticky-things/src/lib/sticky-thing.directive';

@Component({
  selector: 'demo-event-container',
  templateUrl: './event-container.component.html',
  styleUrls: ['./event-container.component.scss']
})
export class EventContainerComponent implements OnInit {

  @ViewChild(StickyThingDirective)
  stickyElement: StickyThingDirective;

  public stickyText: string;

  constructor() {
  }

  ngOnInit() {

    this.stickyElement.stickyChange.subscribe((isSticky) => {
      this.stickyText = isSticky ? 'Yes I am' : 'No I\m not';
    });


  }

}
