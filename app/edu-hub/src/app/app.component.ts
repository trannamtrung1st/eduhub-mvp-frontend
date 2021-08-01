import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';

import { UNSUPPORTED_WIDTH } from './constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  uiSupported: boolean;

  constructor(@Inject(PLATFORM_ID) private _platformId: object) {
    this.uiSupported = true;
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this._platformId)) {
      this._checkWindowSizeSupport();

      window.addEventListener('resize', (_) => {
        this._checkWindowSizeSupport();
      });
    }
  }

  private _checkWindowSizeSupport() {
    const windowWidth = window.innerWidth;
    this.uiSupported = windowWidth > UNSUPPORTED_WIDTH;
  }

}
