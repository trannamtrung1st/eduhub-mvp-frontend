import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

import { Store } from '@ngxs/store';

import { A_ROUTING } from '@app/constants';

import * as CommonCommands from '@core/common/commands/common.commands';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss']
})
export class PageNotFoundComponent implements OnInit {

  A_ROUTING = A_ROUTING;

  constructor(@Inject(PLATFORM_ID) private _platformId: object,
    private _store: Store) { }

  ngOnInit(): void {
    if (isPlatformBrowser(this._platformId)) {
      this._store.dispatch(new CommonCommands.HideLoader());
    }
  }

}
