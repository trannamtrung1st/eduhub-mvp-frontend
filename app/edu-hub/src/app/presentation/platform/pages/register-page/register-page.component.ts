import { Component, Inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TransferState } from '@angular/platform-browser';

import { Store } from '@ngxs/store';
import { NzFormTooltipIcon } from 'ng-zorro-antd/form';
import { NzMessageService } from 'ng-zorro-antd/message';

import { FormHelper } from '@cross/form/form-helper';
import { AppValidators } from '@cross/form/app-validators';

import { A_ROUTING } from '@app/constants';
import { LogoSize } from '@presentation/cross/common/logo/constants';

import { LoaderCommands } from '@core/global/commands/loader.commands';

import { BaseComponent } from '@presentation/cross/components/base-component/base-component';

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
    private _nzMessageService: NzMessageService,
    private _formBuilder: FormBuilder) {
    super(platformId, transferState);
  }

  ngOnInit(): void {
    super.ngOnInit();
    const isBrowser = !this.isPlatformServer;

    if (this.shouldLoad) {
      this.isPlatformServer && this.setTransferredState(new RegisterPageState());
    } else {
      this.patchTransferredState(this);
    }

    const passwordFormControl = new FormControl('', [Validators.required]);
    this.registerFormGroup = this._formBuilder.group({
      email: ['', [Validators.email, Validators.required]],
      password: passwordFormControl,
      checkPassword: ['', [Validators.required, AppValidators.compareValue(passwordFormControl)]],
      nickname: ['', [Validators.required]],
      phoneNumberPrefix: ['+86'],
      phoneNumber: ['', [Validators.required]],
      website: ['', [Validators.required]],
      captcha: ['', [Validators.required]],
      agree: [false]
    });

    isBrowser && this._store.dispatch(new LoaderCommands.Hide());
  }

  onFormSubmit(): void {
    const isValid = FormHelper.validateFormGroup(this.registerFormGroup);
    if (!isValid) return;

    this._nzMessageService.success('[TODO] Register successfully');
  }

  updateConfirmValidator(): void {
    /** wait for refresh value */
    Promise.resolve().then(() => this.registerFormGroup.controls.checkPassword.updateValueAndValidity());
  }
}

class RegisterPageState {
}