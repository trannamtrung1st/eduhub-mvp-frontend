import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { TransferState } from '@angular/platform-browser';

import { NgxsOnInit, State, StateContext } from '@ngxs/store';

import { POST_STATES } from '../constants';

import { TransferableState } from '@core/cross/state-transferable/transferable-state';

class PostStateModel {

    static get default() {
        return new PostStateModel();
    }
}

@State<PostStateModel>({
    name: POST_STATES.post.name,
    defaults: PostStateModel.default
})
@Injectable()
export class PostState extends TransferableState<PostStateModel> implements NgxsOnInit {

    protected transferStateKeyName: string = PostState.name;

    constructor(@Inject(PLATFORM_ID) platformId: object,
        transferState: TransferState
    ) {
        super(platformId, transferState);
    }

    ngxsOnInit(ctx?: StateContext<any>) {
        super.ngxsOnInit(ctx);
        const transferredState = PostStateModel.default;

        if (this.needInitData) {
            this.isPlatformServer && this.setTransferredState(transferredState);
        } else {
            this.patchTransferredState(transferredState);
            ctx?.setState(transferredState);
        }
    }
}