import { Component, Inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { TransferState } from '@angular/platform-browser';

import { Store } from '@ngxs/store';

import { LoaderCommands } from '@core/global/commands/loader.commands';

import { BaseComponent } from '@presentation/cross/components/base-component/base-component';

@Component({
  selector: 'app-normal-layout',
  templateUrl: './normal-layout.component.html',
  styleUrls: ['./normal-layout.component.scss']
})
export class NormalLayoutComponent extends BaseComponent<NormalLayoutState> implements OnInit, OnDestroy {

  protected transferStateKeyName: string = NormalLayoutComponent.name;

  constructor(
    @Inject(PLATFORM_ID) platformId: object,
    transferState: TransferState,
    private _store: Store
  ) {
    super(platformId, transferState);
  }

  ngOnInit(): void {
    super.ngOnInit();

    if (this.shouldLoad) {
      this.isPlatformServer && this.setTransferredState(new NormalLayoutState());
    } else {
      this.patchTransferredState(this);
    }
  }

  onPageDeactivated(_: any) {
    const pageEl = document.querySelector('html') as HTMLElement;
    pageEl.scrollTop = 0;
    this._store.dispatch(new LoaderCommands.Reset());
  }

}

class NormalLayoutState {
}