import { Component, Inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { TransferState } from '@angular/platform-browser';

import { Store } from '@ngxs/store';

import { LoaderCommands } from '@core/global/commands/loader.commands';

import { BaseComponent } from '@presentation/cross/components/base-component/base-component';

@Component({
  selector: 'app-create-video-page',
  templateUrl: './create-video-page.component.html',
  styleUrls: ['./create-video-page.component.scss']
})
export class CreateVideoPageComponent extends BaseComponent<CreateVideoState> implements OnInit, OnDestroy {

  protected transferStateKeyName: string = CreateVideoPageComponent.name;

  constructor(
    @Inject(PLATFORM_ID) platformId: object,
    transferState: TransferState,
    private _store: Store
  ) {
    super(platformId, transferState);
  }

  ngOnInit(): void {
    super.ngOnInit();
    if (this.isPlatformServer) return;

    this._store.dispatch(new LoaderCommands.Hide());
  }
}

class CreateVideoState {
}
