import { Injectable } from '@angular/core';

import { SmoothScrollManager } from 'ngx-scrollbar/smooth-scroll';

import { CoreModule } from '@core/core.module';

@Injectable({
  providedIn: CoreModule
})
export class GlobalService {

  constructor(private _scrollManager: SmoothScrollManager) {
  }

  get scrollManager(): SmoothScrollManager {
    return this._scrollManager;
  }
}
