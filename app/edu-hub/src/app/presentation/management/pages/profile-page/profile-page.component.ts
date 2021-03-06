import { Component, Inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { TransferState } from '@angular/platform-browser';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { cloneDeep } from 'lodash';

import { FormHelper } from '@cross/form/form-helper';

import { UserModel } from '@core/identity/states/models/user-model';
import { UserViewModel } from './view-models/user-view.model';
import * as CommonCommands from '@core/common/commands/common.commands';

import { IdentityState } from '@core/identity/states/identity.state';

import { BaseComponent } from '@presentation/cross/components/base-component/base-component';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent extends BaseComponent<ProfileState> implements OnInit, OnDestroy {

  protected transferStateKeyName: string = ProfilePageComponent.name;

  profileFormGroup!: FormGroup;
  currentUser$!: Observable<UserViewModel>;
  incomes = INCOME_MOCK_DATA;

  @Select(IdentityState.currentUser) private _currentUser$!: Observable<UserModel>;

  constructor(
    @Inject(PLATFORM_ID) platformId: object,
    transferState: TransferState,
    private _store: Store,
    private _formBuilder: FormBuilder
  ) {
    super(platformId, transferState);
  }

  ngOnInit(): void {
    super.ngOnInit();
    if (this.isPlatformServer) return;

    this.profileFormGroup = this._formBuilder.group({
      emailAddress: ['', [Validators.email, Validators.required]],
      username: ['', [Validators.required]],
      fullName: ['', [Validators.required]],
      phoneNumberPrefix: ['+86'],
      phoneNumber: ['', [Validators.required]],
      website: ['', [Validators.required]]
    });

    this.currentUser$ = this._currentUser$.pipe(map(user => cloneDeep(user)));

    this.subscriptions.push(this.currentUser$.subscribe(user => {
      this._patchFormValue(user);
    }));

    this._store.dispatch(new CommonCommands.HideLoader());
  }

  onFormSubmit(): void {
    const isValid = FormHelper.validateFormGroup(this.profileFormGroup);
    if (!isValid) return;
  }

  private _patchFormValue(user: UserViewModel) {
    this.profileFormGroup.patchValue({
      ...user
    });
  }

}

class ProfileState {
}

const INCOME_MOCK_DATA: { fromUserName: string, amount: number, date: Date, resource: string }[] = [];

for (let i = 0; i < 50; i++) {
  INCOME_MOCK_DATA.push(
    { fromUserName: `User ${i}`, amount: Math.random() * 100000, date: new Date(), resource: `Web master ${i}` }
  );
}