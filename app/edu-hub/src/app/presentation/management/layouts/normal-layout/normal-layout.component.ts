import { Component, ElementRef, Inject, OnDestroy, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { TransferState } from '@angular/platform-browser';

import { Store } from '@ngxs/store';

import { MENU_ITEMS } from '../constants';

import { LoaderCommands } from '@core/global/commands/loader.commands';
import { MenuItemViewModel } from '../view-models/menu-item-view.model';

import { BaseComponent } from '@presentation/cross/base-component/base-component';


import { ScrollingService } from '@infras/scrolling/scrolling.service';
import { RoutingService } from '@cross/routing/routing.service';

@Component({
  selector: 'app-normal-layout',
  templateUrl: './normal-layout.component.html',
  styleUrls: ['./normal-layout.component.scss']
})
export class NormalLayoutComponent extends BaseComponent<NormalLayoutState> implements OnInit, OnDestroy {

  protected transferStateKeyName: string = NormalLayoutComponent.name;

  menuItems: MenuItemViewModel[];

  @ViewChild("menu") private _menuRef!: ElementRef<HTMLElement>;
  private _lastActiveMenu?: MenuItemViewModel;

  constructor(
    @Inject(PLATFORM_ID) platformId: object,
    transferState: TransferState,
    private _store: Store,
    private _routingService: RoutingService,
    private _scrollingService: ScrollingService,
  ) {
    super(platformId, transferState);
    this.menuItems = MENU_ITEMS.map(menuItem => new MenuItemViewModel(menuItem));
  }

  ngOnInit(): void {
    super.ngOnInit();
    if (this.isPlatformServer) return;
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

  onPageActivated(_: any) {
    this._lastActiveMenu = this.menuItems.find(menuItem => this._routingService.isActive(menuItem.url, false));
    if (this._lastActiveMenu) this._lastActiveMenu.active = true;
  }

  onPageDeactivated(_: any) {
    if (this._lastActiveMenu) this._lastActiveMenu.active = false;
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