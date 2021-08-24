import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Select, Store } from '@ngxs/store';
import { cloneDeep } from 'lodash';

import { A_ROUTING } from '@app/constants';
import { NAV_ITEMS } from './constants';

import { UserModel } from '@core/identity/states/models/user-model';
import { UserViewModel } from './view-models/user-view.model';
import * as IdentityCommands from '@core/identity/commands/identity.commands';

import { IdentityState } from '@core/identity/states/identity.state';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.scss']
})
export class TopNavComponent implements OnInit {

  A_ROUTING = A_ROUTING;
  NAV_ITEMS = NAV_ITEMS;

  currentUser$!: Observable<UserViewModel>;

  @Select(IdentityState.currentUser) private _currentUser$!: Observable<UserModel>;

  constructor(private _store: Store) { }

  ngOnInit(): void {
    this.currentUser$ = this._currentUser$
      .pipe(map(user => cloneDeep(user)));
  }

  onLogoutClicked(event: any) {
    this._store.dispatch(new IdentityCommands.Logout());
  }

}
