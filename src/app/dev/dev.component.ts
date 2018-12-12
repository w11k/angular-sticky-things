import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'demo-dev',
  templateUrl: './dev.component.html',
  styleUrls: ['./dev.component.scss']
})
export class DevComponent implements OnInit {
  inside = [];
  outside = [];
  marginTop = 0;
  marginBottom = 0;
  enabled = true;

  constructor() {
  }

  ngOnInit() {
  }

}
