import { Component, Inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TransferState } from '@angular/platform-browser';

import { Store } from '@ngxs/store';
import { NzFormTooltipIcon } from 'ng-zorro-antd/form';

import { A_ROUTING } from '@app/constants';
import { LogoSize } from '@presentation/cross/logo/constants';

import { LoaderCommands } from '@core/global/commands/loader.commands';

import { BaseComponent } from '@presentation/cross/base-component/base-component';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent extends BaseComponent<RegisterPageState> implements OnInit, OnDestroy {

  protected transferStateKeyName: string = RegisterPageComponent.name;

  A_ROUTING = A_ROUTING;

  logoSize = LogoSize.large;
  registerFormGroup!: FormGroup;
  captchaTooltipIcon: NzFormTooltipIcon = {
    type: 'info-circle',
    theme: 'twotone'
  };

  constructor(@Inject(PLATFORM_ID) platformId: object,
    transferState: TransferState,
    private _store: Store,
    private _formBuilder: FormBuilder) {
    super(platformId, transferState);
  }

  ngOnInit(): void {
    super.ngOnInit();
    const isBrowser = !this.isPlatformServer;

    if (this.needInitData) {
      this.isPlatformServer && this.setTransferredState(new RegisterPageState());
    } else {
      this.patchTransferredState(this);
    }

    this.registerFormGroup = this._formBuilder.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required]],
      checkPassword: ['', [Validators.required, this.confirmationValidator]],
      nickname: ['', [Validators.required]],
      phoneNumberPrefix: ['+86'],
      phoneNumber: ['', [Validators.required]],
      website: ['', [Validators.required]],
      captcha: ['', [Validators.required]],
      agree: [false]
    });

    isBrowser && this._store.dispatch(new LoaderCommands.Hide());
  }

  onFormSubmitted(): void {
    let hasError = false;

    for (const key in this.registerFormGroup.controls) {
      if (this.registerFormGroup.controls.hasOwnProperty(key)) {
        const formControl = this.registerFormGroup.controls[key];
        formControl.markAsDirty();
        formControl.updateValueAndValidity();

        if (formControl.errors) {
          hasError = true;
        }
      }
    }

    if (hasError) return;

    alert('Register done');
  }

  updateConfirmValidator(): void {
    /** wait for refresh value */
    Promise.resolve().then(() => this.registerFormGroup.controls.checkPassword.updateValueAndValidity());
  }

  confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.registerFormGroup.controls.password.value) {
      return { confirm: true, error: true };
    }
    return {};
  };

}

class RegisterPageState {
}