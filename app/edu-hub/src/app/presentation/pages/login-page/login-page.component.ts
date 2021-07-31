import { Component, OnInit } from '@angular/core';

import { LogoSize } from '@presentation/components/cross/logo/constants';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  logoSize = LogoSize.large;

  constructor() {
  }

  ngOnInit(): void {
  }

}
