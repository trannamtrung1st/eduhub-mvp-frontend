import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { TransferState } from '@angular/platform-browser';

import { Action, NgxsOnInit, Selector, State, StateContext } from '@ngxs/store';
import { cloneDeep } from 'lodash';

import { VIDEO_STATES } from '../constants';

import { VideoDetailModel } from '../models/video-detail.model';
import { VideoQueries } from '../queries/video.queries';

import { TransferableState } from '@cross/state/transferable-state';

import { MockDatabaseService } from '@persistence/database/mock-database.service';

export const CURRENT_WATCHING_VIDEO_STATES = VIDEO_STATES.video.currentWatchingVideo;
export const GET_VIDEO_DETAIL_STATES = CURRENT_WATCHING_VIDEO_STATES.states.getDetail;

class CurrentWatchingVideoStateModel {

    constructor(public video?: VideoDetailModel,
        public getVideoDetailState: string = GET_VIDEO_DETAIL_STATES.unset) {
    }

    static get default() {
        return new CurrentWatchingVideoStateModel();
    }
}

@State<CurrentWatchingVideoStateModel>({
    name: VIDEO_STATES.video.currentWatchingVideo.name,
    defaults: CurrentWatchingVideoStateModel.default
})
@Injectable()
export class CurrentWatchingVideoState extends TransferableState<CurrentWatchingVideoStateModel> implements NgxsOnInit {

    protected transferStateKeyName: string = CurrentWatchingVideoState.name;

    constructor(@Inject(PLATFORM_ID) platformId: object,
        transferState: TransferState,
        private _databaseService: MockDatabaseService
    ) {
        super(platformId, transferState);
    }

    ngxsOnInit(ctx?: StateContext<any>) {
        super.ngxsOnInit(ctx);
        const transferredState = CurrentWatchingVideoStateModel.default;

        if (this.needInitData) {
            this.isPlatformServer && this.setTransferredState(transferredState);
        } else {
            this.patchTransferredState(transferredState);
            ctx?.setState(transferredState);
        }
    }

    @Selector()
    static video(state: CurrentWatchingVideoStateModel) {
        return state.video;
    }

    @Selector()
    static getVideoDetailState(state: CurrentWatchingVideoStateModel) {
        return state.getVideoDetailState;
    }

    @Action(VideoQueries.GetDetail)
    filter(context: StateContext<CurrentWatchingVideoStateModel>, query: VideoQueries.GetDetail) {
        const srcVideos = this._databaseService.database.videos;
        const videoDetail = srcVideos.find(video => video.id == query.id);

        if (!videoDetail) {
            context.patchState({
                getVideoDetailState: GET_VIDEO_DETAIL_STATES.notFound
            });
            return;
        }

        const videoDetailModel = cloneDeep(videoDetail) as VideoDetailModel;
        const patch = {
            video: videoDetailModel
        };

        context.patchState(patch);
        this.needInitData && this.isPlatformServer
            && this.updateTransferredState((state) => Object.assign(state, patch), CurrentWatchingVideoStateModel.default);
    }
}