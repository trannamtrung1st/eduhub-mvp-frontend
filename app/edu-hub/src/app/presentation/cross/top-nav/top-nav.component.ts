import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Select, Store } from '@ngxs/store';
import { cloneDeep } from 'lodash';

import { A_ROUTING } from '@app/constants';

import { UserModel } from '@core/identity/models/user-model';
import { UserViewModel } from './view-models/user-view.model';
import { IdentityCommands } from '@core/identity/commands/identity.commands';

import { CurrentUserState } from '@core/identity/states/current-user.state';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.scss']
})
export class TopNavComponent implements OnInit {

  A_ROUTING = A_ROUTING;

  currentUser$!: Observable<UserViewModel>;

  @Select(CurrentUserState.currentUser) private _currentUser$!: Observable<UserModel>;

  constructor(private _store: Store) { }

  ngOnInit(): void {
    this.currentUser$ = this._currentUser$
      .pipe(map(user => cloneDeep(user)));
  }

  onLogoutClicked(event: any) {
    this._store.dispatch(new IdentityCommands.Logout());
  }

}
