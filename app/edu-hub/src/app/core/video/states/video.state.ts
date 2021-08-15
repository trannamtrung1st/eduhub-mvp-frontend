import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { TransferState } from '@angular/platform-browser';

import { NgxsOnInit, State, StateContext } from '@ngxs/store';

import { VIDEO_STATES } from '../constants';

import { TransferableState } from '@cross/state/transferable-state';

class VideoStateModel {
    static get default() {
        return new VideoStateModel();
    }
}

@State<VideoStateModel>({
    name: VIDEO_STATES.video.name,
    defaults: VideoStateModel.default
})
@Injectable()
export class VideoState extends TransferableState<VideoStateModel> implements NgxsOnInit {

    protected transferStateKeyName: string = VideoState.name;

    constructor(@Inject(PLATFORM_ID) platformId: object,
        transferState: TransferState) {
        super(platformId, transferState);
    }

    ngxsOnInit(ctx?: StateContext<any>) {
        super.ngxsOnInit(ctx);
        const transferredState = VideoStateModel.default;

        if (this.shouldLoad) {
            this.isPlatformServer && this.setTransferredState(transferredState);
        } else {
            this.patchTransferredState(transferredState);
            ctx?.setState(transferredState);
        }
    }
}