import { Component, Inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { TransferState } from '@angular/platform-browser';

import { Store } from '@ngxs/store';

import { LoaderCommands } from '@core/global/commands/loader.commands';

import { BaseComponent } from '@presentation/cross/base-component/base-component';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent extends BaseComponent<ProfileState> implements OnInit, OnDestroy {

  protected transferStateKeyName: string = ProfilePageComponent.name;

  constructor(
    @Inject(PLATFORM_ID) platformId: object,
    transferState: TransferState,
    private _store: Store
  ) {
    super(platformId, transferState);
  }

  ngOnInit(): void {
    super.ngOnInit();
    const isBrowser = !this.isPlatformServer;

    if (this.needInitData) {
      this.isPlatformServer && this.setTransferredState(new ProfileState());
    } else {
      this.patchTransferredState(this);
    }

    isBrowser && this._store.dispatch(new LoaderCommands.Hide());
  }

}

class ProfileState {
}