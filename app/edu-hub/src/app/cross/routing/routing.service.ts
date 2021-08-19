import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { CrossModule } from '@cross/cross.module';

@Injectable({
  providedIn: CrossModule
})
export class RoutingService {

  constructor(private _router: Router) { }

  isActive(url: string, exact: boolean = true) {
    return exact
      ? this._router.isActive(url, { paths: 'subset', queryParams: 'subset', fragment: 'ignored', matrixParams: 'ignored' })
      : this._router.isActive(url, { paths: 'exact', queryParams: 'exact', fragment: 'exact', matrixParams: 'exact' });
  }
}
