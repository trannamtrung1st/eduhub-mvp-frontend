import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { TransferState } from '@angular/platform-browser';

import { NgxsOnInit, State, StateContext } from '@ngxs/store';

import { BLOG_STATES } from '../constants';

import { TransferableState } from '@cross/state/transferable-state';

class BlogStateModel {

    static get default() {
        return new BlogStateModel();
    }
}

@State<BlogStateModel>({
    name: BLOG_STATES.blog.name,
    defaults: BlogStateModel.default
})
@Injectable()
export class BlogState extends TransferableState<BlogStateModel> implements NgxsOnInit {

    protected transferStateKeyName: string = BlogState.name;

    constructor(@Inject(PLATFORM_ID) platformId: object,
        transferState: TransferState
    ) {
        super(platformId, transferState);
    }

    ngxsOnInit(ctx?: StateContext<any>) {
        super.ngxsOnInit(ctx);
        const transferredState = BlogStateModel.default;

        if (this.shouldLoad) {
            this.isPlatformServer && this.setTransferredState(transferredState);
        } else {
            this.patchTransferredState(transferredState);
            ctx?.setState(transferredState);
        }
    }
}