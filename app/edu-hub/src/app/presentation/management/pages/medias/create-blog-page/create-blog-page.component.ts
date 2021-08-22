import { Component, Inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { TransferState } from '@angular/platform-browser';

import { Store } from '@ngxs/store';

import { LoaderCommands } from '@core/global/commands/loader.commands';

import { BaseComponent } from '@presentation/cross/components/base-component/base-component';

@Component({
  selector: 'app-create-blog-page',
  templateUrl: './create-blog-page.component.html',
  styleUrls: ['./create-blog-page.component.scss']
})
export class CreateBlogPageComponent extends BaseComponent<CreateBlogState> implements OnInit, OnDestroy {

  protected transferStateKeyName: string = CreateBlogPageComponent.name;

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

class CreateBlogState {
}
