import { Component, Inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { AnimationEvent } from '@angular/animations';
import { TransferState } from '@angular/platform-browser';

import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';

import { fading } from '@cross/animation/animation-helper';

import { UNSUPPORTED_WIDTH } from './constants';

import { LoaderCommands } from '@core/global/commands/loader.commands';

import { APP_STATUS_STATES, GlobalState } from '@core/global/states/global.state';
import { LoaderState } from '@core/global/states/loader.state';

import { BaseComponent } from '@presentation/cross/base-component/base-component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    fading(),
  ]
})
export class AppComponent extends BaseComponent<AppState> implements OnInit, OnDestroy {

  protected transferStateKeyName: string = AppComponent.name;

  APP_STATUS_STATES = APP_STATUS_STATES;

  @Select(GlobalState.appStatus) appStatus$!: Observable<string>;
  @Select(LoaderState.visibilityState) loaderVisibilityState$!: Observable<string>;
  @Select(LoaderState.visible) loaderVisible$!: Observable<boolean>;
  uiSupported: boolean;

  constructor(@Inject(PLATFORM_ID) platformId: object,
    transferState: TransferState,
    private _store: Store) {
    super(platformId, transferState);
    this.uiSupported = true;
  }

  ngOnInit(): void {
    super.ngOnInit();
    const isBrowser = !this.isPlatformServer;

    if (this.shouldLoad) {
      this.isPlatformServer && this.setTransferredState(new AppState(
      ));
    } else {
      this.patchTransferredState(this);
    }

    if (isBrowser) {
      // [TODO] Add responsive support
      this._checkWindowSizeSupport();

      window.addEventListener('resize', (_) => {
        this._checkWindowSizeSupport();
      });
    }
  }

  onPageDeactivated(_: any) {
    const pageEl = document.querySelector('html') as HTMLElement;
    pageEl.scrollTop = 0;
    this._store.dispatch(new LoaderCommands.Reset());
  }

  onLoaderAnimationDone(event: AnimationEvent) {
    this._store.dispatch(new LoaderCommands.AnimationDone(event));
  }

  private _checkWindowSizeSupport() {
    const windowWidth = window.innerWidth;
    this.uiSupported = windowWidth > UNSUPPORTED_WIDTH;
  }

}

class AppState {
}
