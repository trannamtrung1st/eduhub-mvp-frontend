import { Component, Inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TransferState } from '@angular/platform-browser';

import { Store } from '@ngxs/store';

import { A_ROUTING } from '@app/constants';
import { LogoSize } from '@presentation/components/cross/logo/constants';

import { LoaderCommands } from '@core/global/commands/loader.commands';

import { BaseComponent } from '@presentation/components/cross/base-component/base-component';

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

    if (this.needInitData) {
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

    alert('Logged in');
  }

}

class LoginPageState {
}