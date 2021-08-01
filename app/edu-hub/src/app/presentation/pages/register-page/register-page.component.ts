import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { NzFormTooltipIcon } from 'ng-zorro-antd/form';

import { LogoSize } from '@presentation/components/cross/logo/constants';
import { A_ROUTING } from '@app/constants';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent implements OnInit {

  A_ROUTING = A_ROUTING;

  logoSize = LogoSize.large;
  registerFormGroup!: FormGroup;
  captchaTooltipIcon: NzFormTooltipIcon = {
    type: 'info-circle',
    theme: 'twotone'
  };

  constructor(private _formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
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
