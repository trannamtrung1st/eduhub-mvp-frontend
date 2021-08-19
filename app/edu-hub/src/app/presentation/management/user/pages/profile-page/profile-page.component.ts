import { Component, Inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { TransferState } from '@angular/platform-browser';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { cloneDeep } from 'lodash';

import { FormHelper } from '@cross/form/form-helper';

import { LoaderCommands } from '@core/global/commands/loader.commands';
import { UserModel } from '@core/identity/models/user-model';
import { UserViewModel } from './view-models/user-view.model';

import { CurrentUserState } from '@core/identity/states/current-user.state';

import { BaseComponent } from '@presentation/cross/base-component/base-component';

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

  @Select(CurrentUserState.currentUser) private _currentUser$!: Observable<UserModel>;

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

    this._store.dispatch(new LoaderCommands.Hide());
  }

  onFormSubmitted(): void {
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

const INCOME_MOCK_DATA: any[] = [];

for (let i = 0; i < 50; i++) {
  INCOME_MOCK_DATA.push(
    { fromUserName: `User ${i}`, amount: Math.random() * 100000, date: new Date(), resource: `Web master ${i}` }
  );
}