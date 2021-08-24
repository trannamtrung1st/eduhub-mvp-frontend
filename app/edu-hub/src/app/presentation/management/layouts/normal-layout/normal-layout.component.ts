import { Component, ElementRef, Inject, OnDestroy, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { TransferState } from '@angular/platform-browser';

import { Store } from '@ngxs/store';

import { MENU_ITEMS } from '../constants';

import { MenuItemViewModel } from '../view-models/menu-item-view.model';
import * as CommonCommands from '@core/common/commands/common.commands';

import { BaseComponent } from '@presentation/cross/components/base-component/base-component';

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
    private _routingService: RoutingService
  ) {
    super(platformId, transferState);
    this.menuItems = MENU_ITEMS.map(menuItem => new MenuItemViewModel(menuItem));
  }

  ngOnInit(): void {
    super.ngOnInit();
    if (this.isPlatformServer) return;
  }

  onPageActivated(_: any) {
    this._lastActiveMenu = this.menuItems.find(menuItem => this._routingService.isActive(menuItem.url, false));
    if (this._lastActiveMenu) this._lastActiveMenu.active = true;
  }

  onPageDeactivated(_: any) {
    if (this._lastActiveMenu) this._lastActiveMenu.active = false;
    const pageEl = document.querySelector('html') as HTMLElement;
    pageEl.scrollTop = 0;
    this._store.dispatch(new CommonCommands.ResetLoader());
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