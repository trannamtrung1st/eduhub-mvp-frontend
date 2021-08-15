import { Component, ElementRef, Inject, OnDestroy, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { TransferState } from '@angular/platform-browser';

import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';

import { MENU_ITEMS } from './constants';

import { LoaderCommands } from '@core/global/commands/loader.commands';

import { BaseComponent } from '@presentation/cross/base-component/base-component';

import { ManagementMenuState } from '@core/global/states/management-menu.state';

import { ScrollingService } from '@infras/scrolling/scrolling.service';

@Component({
  selector: 'app-normal-layout',
  templateUrl: './normal-layout.component.html',
  styleUrls: ['./normal-layout.component.scss']
})
export class NormalLayoutComponent extends BaseComponent<NormalLayoutState> implements OnInit, OnDestroy {

  protected transferStateKeyName: string = NormalLayoutComponent.name;

  MENU_ITEMS = MENU_ITEMS;

  @Select(ManagementMenuState.currentMenuId) currentMenuId$!: Observable<string>;

  @ViewChild("menu") private _menuRef!: ElementRef<HTMLElement>;

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

    if (this.shouldLoad) {
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

  onSiderCollapsedChanged(collapsed: boolean) {
    if (collapsed) {
      this._menuRef.nativeElement.classList.add('edh-menu--collapsed');
    } else {
      this._menuRef.nativeElement.classList.remove('edh-menu--collapsed');
    }
  }
}

class NormalLayoutState {
}