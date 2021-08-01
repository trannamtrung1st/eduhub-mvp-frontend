import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { A_ROUTING } from '@app/constants';

import { LogoSize } from '@presentation/components/cross/logo/constants';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  A_ROUTING = A_ROUTING;

  logoSize = LogoSize.large;
  loginFormGroup!: FormGroup;

  constructor(private _formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.loginFormGroup = this._formBuilder.group({
      userName: ['', [Validators.required]],
      password: ['', [Validators.required]],
      remember: [true]
    });
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
