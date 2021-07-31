import { Component, OnInit } from '@angular/core';

import { A_ROUTING } from '@app/constants';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.scss']
})
export class TopNavComponent implements OnInit {

  A_ROUTING = A_ROUTING;

  constructor() { }

  ngOnInit(): void {
  }

}
