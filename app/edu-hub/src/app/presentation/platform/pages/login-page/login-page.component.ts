import { Component, Inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TransferState } from '@angular/platform-browser';

import { Select, Store } from '@ngxs/store';
import { Navigate } from '@ngxs/router-plugin';
import { Observable } from 'rxjs';
import { withLatestFrom } from 'rxjs/operators';

import { A_ROUTING } from '@app/constants';
import { LogoSize } from '@presentation/cross/logo/constants';

import { LoaderCommands } from '@core/global/commands/loader.commands';
import { IdentityCommands } from '@core/identity/commands/identity.commands';
import { LoginViewModel } from './view-models/login-view.model';
import { UserModel } from '@core/identity/models/user-model';

import { BaseComponent } from '@presentation/cross/base-component/base-component';

import { CurrentUserState } from '@core/identity/states/current-user.state';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent extends BaseComponent<LoginPageState> implements OnInit, OnDestroy {

  protected transferStateKeyName: string = LoginPageComponent.name;

  A_ROUTING = A_ROUTING;

  logoSize = LogoSize.large;
  loginFormGroup!: FormGroup;

  @Select(CurrentUserState.currentUser) private _currentUser$!: Observable<UserModel>;

  constructor(
    @Inject(PLATFORM_ID) platformId: object,
    transferState: TransferState,
    private _formBuilder: FormBuilder,
    private _store: Store
  ) {
    super(platformId, transferState);
  }

  ngOnInit(): void {
    super.ngOnInit();
    const isBrowser = !this.isPlatformServer;

    if (this.shouldLoad) {
      this.isPlatformServer && this.setTransferredState(new LoginPageState());
    } else {
      this.patchTransferredState(this);
    }

    this.loginFormGroup = this._formBuilder.group({
      userName: ['', [Validators.required]],
      password: ['', [Validators.required]],
      remember: [true]
    });

    isBrowser && this._store.dispatch(new LoaderCommands.Hide());
  }

  onFormSubmitted(): void {
    let hasError = false;

    for (const key in this.loginFormGroup.controls) {
      if (this.loginFormGroup.controls.hasOwnProperty(key)) {
        const formControl = this.loginFormGroup.controls[key];
        formControl.markAsDirty();
        formControl.updateValueAndValidity();

        if (formControl.errors) {
          hasError = true;
        }
      }
    }

    if (hasError) return;

    const loginModel = this.loginFormGroup.value as LoginViewModel;
    this._store.dispatch(new IdentityCommands.Login(loginModel.userName, loginModel.password))
      .pipe(withLatestFrom(this._currentUser$))
      .subscribe(([_, user]) => {
        if (user) this._store.dispatch(new Navigate([A_ROUTING.platform.home]));
        else alert('[TODO] Handle login');
      });
  }

}

class LoginPageState {
}