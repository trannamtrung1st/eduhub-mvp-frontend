import { Component, Inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { TransferState } from '@angular/platform-browser';

import { Store } from '@ngxs/store';

import { LoaderCommands } from '@core/global/commands/loader.commands';

import { BaseComponent } from '@presentation/components/cross/base-component/base-component';

import { ScrollingService } from '@infras/scrolling/scrolling.service';

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
    private _store: Store,
    private _scrollingService: ScrollingService,
  ) {
    super(platformId, transferState);
  }

  ngOnInit(): void {
    super.ngOnInit();

    if (this.needInitData) {
      this.isPlatformServer && this.setTransferredState(new NormalLayoutState());
    } else {
      this.patchTransferredState(this);
    }
  }

  onGoToTopClicked(event: MouseEvent) {
    event.preventDefault();
    const pageEl = document.querySelector('html') as HTMLElement;
    const offsetTop = pageEl.offsetTop;
    this._scrollingService.scrollManager.scrollTo(pageEl, {
      top: offsetTop,
      duration: 500
    });
    return false;
  }

  onPageDeactivated(_: any) {
    const pageEl = document.querySelector('html') as HTMLElement;
    pageEl.scrollTop = 0;
    this._store.dispatch(new LoaderCommands.Reset());
  }

  onPageScrolled(_: any) {
    const btnGoToTop = document.querySelector('.gototop.js-top');
    const pageEl = document.querySelector('html') as HTMLElement;

    if (pageEl.scrollTop > 200) {
      btnGoToTop?.classList.add('active');
    } else {
      btnGoToTop?.classList.remove('active');
    }
  }

}

class NormalLayoutState {
}