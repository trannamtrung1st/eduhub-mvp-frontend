import { Component, Inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { AnimationEvent } from '@angular/animations';
import { TransferState } from '@angular/platform-browser';

import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';

import { fading } from '@cross/animation/animation-helper';

import { UNSUPPORTED_WIDTH } from './constants';

import { APP_STATUS_STATES, CommonState } from '@core/common/states/common.state';

import * as CommonCommands from '@core/common/commands/common.commands';
import * as CommonEvents from '@core/common/events/common.events';

import { BaseComponent } from '@presentation/cross/components/base-component/base-component';

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

  @Select(CommonState.appStatus) appStatus$!: Observable<string>;
  @Select(CommonState.loaderVisibilityState) loaderVisibilityState$!: Observable<string>;
  @Select(CommonState.loaderVisible) loaderVisible$!: Observable<boolean>;
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
    this._store.dispatch(new CommonCommands.ResetLoader());
  }

  onLoaderAnimationDone(event: AnimationEvent) {
    this._store.dispatch(new CommonEvents.LoaderAnimationDone(event));
  }

  private _checkWindowSizeSupport() {
    const windowWidth = window.innerWidth;
    this.uiSupported = windowWidth > UNSUPPORTED_WIDTH;
  }

}

class AppState {
}
