import { Injectable } from '@angular/core';

import { CoreModule } from '@core/core.module';

import { NgScrollbar } from 'ngx-scrollbar';

@Injectable({
  providedIn: CoreModule
})
export class GlobalService {

  private _pageScrollBarRef?: NgScrollbar;

  constructor() { }

  get pageScrollBar(): NgScrollbar | undefined {
    return this._pageScrollBarRef;
  }

  set pageScrollBar(ref: NgScrollbar | undefined) {
    this._pageScrollBarRef = ref;
  }
}
