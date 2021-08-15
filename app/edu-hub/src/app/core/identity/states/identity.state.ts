import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { TransferState } from '@angular/platform-browser';

import { NgxsOnInit, State, StateContext } from '@ngxs/store';

import { IDENTITY_STATES } from '../constants';

import { TransferableState } from '@cross/state/transferable-state';
import { CurrentUserState } from './current-user.state';

class IdentityStateModel {
    static get default() {
        return new IdentityStateModel();
    }
}

@State<IdentityStateModel>({
    name: IDENTITY_STATES.identity.name,
    defaults: IdentityStateModel.default,
    children: [
        CurrentUserState
    ]
})
@Injectable()
export class IdentityState extends TransferableState<IdentityStateModel> implements NgxsOnInit {

    protected transferStateKeyName: string = IdentityState.name;

    constructor(@Inject(PLATFORM_ID) platformId: object,
        transferState: TransferState) {
        super(platformId, transferState);
    }

    ngxsOnInit(ctx?: StateContext<any>) {
        super.ngxsOnInit(ctx);
        const transferredState = IdentityStateModel.default;

        if (this.shouldLoad) {
            this.isPlatformServer && this.setTransferredState(transferredState);
        } else {
            this.patchTransferredState(transferredState);
            ctx?.setState(transferredState);
        }
    }
}