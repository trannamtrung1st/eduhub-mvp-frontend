import { Component, Input, OnInit } from '@angular/core';

import { A_ROUTING } from '@app/constants';
import { LogoSize } from './constants';

@Component({
  selector: 'app-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.scss']
})
export class LogoComponent implements OnInit {

  @Input() logoUrl: string;
  @Input() size: LogoSize;
  @Input() useHref: boolean;

  LogoSize = LogoSize;

  constructor() {
    this.logoUrl = A_ROUTING.home;
    this.size = LogoSize.default;
    this.useHref = false;
  }

  ngOnInit(): void {
  }

}
