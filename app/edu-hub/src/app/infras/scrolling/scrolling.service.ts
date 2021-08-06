import { Injectable } from '@angular/core';

import { SmoothScrollManager } from 'ngx-scrollbar/smooth-scroll';

import { InfrasModule } from '@infras/infras.module';

@Injectable({
  providedIn: InfrasModule
})
export class ScrollingService {

  constructor(private _scrollManager: SmoothScrollManager) {
  }

  get scrollManager(): SmoothScrollManager {
    return this._scrollManager;
  }
}
