import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { TransferState } from '@angular/platform-browser';

import { Action, NgxsOnInit, Selector, State, StateContext } from '@ngxs/store';

import { VIDEO_STATES } from '../constants';
import { ErrorCode } from '@core/constants';

import * as VideoQueries from '../queries/video.queries';
import { VideoStateModel } from './models/video-state.model';
import { AppError } from '@core/app.error';

import { TransferableState } from '@cross/state/transferable-state';

import { Mediator } from '@core/mediator';

@State<VideoStateModel>({
    name: VIDEO_STATES.video.name,
    defaults: VideoStateModel.default
})
@Injectable()
export class VideoState extends TransferableState<VideoStateModel> implements NgxsOnInit {

    protected transferStateKeyName: string = VideoState.name;

    constructor(@Inject(PLATFORM_ID) platformId: object,
        transferState: TransferState,
        private _mediator: Mediator) {
        super(platformId, transferState);
    }

    ngxsOnInit(ctx?: StateContext<any>) {
        super.ngxsOnInit(ctx);
        this.initOrPatchState(VideoStateModel.default, ctx);
    }

    @Selector()
    static filteredVideos(state: VideoStateModel) {
        return state.filteredVideos;
    }

    @Selector()
    static recommendedVideos(state: VideoStateModel) {
        return state.recommendedVideos;
    }

    @Selector()
    static randomVideos(state: VideoStateModel) {
        return state.randomVideos;
    }

    @Selector()
    static videoDetail(state: VideoStateModel) {
        return state.videoDetail;
    }

    @Selector()
    static videoDetailEvent(state: VideoStateModel) {
        return state.videoDetailEvent;
    }

    @Action(VideoQueries.GetDetail)
    getDetail(context: StateContext<VideoStateModel>, query: VideoQueries.GetDetail) {
        return this._mediator.handlers[VideoQueries.GetDetail.type](query).then((videoDetail) => {
            const successEvent = new VideoQueries.GetDetailSuccess(videoDetail);
            const patch = {
                videoDetail: videoDetail,
                videoDetailEvent: {
                    success: successEvent
                }
            };
            context.patchState(patch);
            context.dispatch(successEvent);
            this.tryTransferState(patch, VideoStateModel.default);
        }).catch((error: AppError) => {
            let patch = {};
            switch (error.code) {
                case ErrorCode.videoNotFound:
                    const notFoundEvent = new VideoQueries.GetDetailNotFound();
                    patch = {
                        videoDetail: undefined,
                        videoDetailEvent: {
                            notFound: notFoundEvent
                        }
                    };
                    context.patchState(patch);
                    context.dispatch(notFoundEvent);
                    break;
                default: throw error;
            }
            this.tryTransferState(patch, VideoStateModel.default);
        });
    }

    @Action(VideoQueries.Filter)
    filter(context: StateContext<VideoStateModel>, query: VideoQueries.Filter) {
        return this._mediator.handlers[VideoQueries.Filter.type](query).then((filteredVideos) => {
            const patch = { filteredVideos };
            context.patchState(patch);
            this.tryTransferState(patch, VideoStateModel.default);
        });
    }

    @Action(VideoQueries.GetRecommended)
    getRecommended(context: StateContext<VideoStateModel>, query: VideoQueries.GetRecommended) {
        return this._mediator.handlers[VideoQueries.GetRecommended.type](query).then((recommendedVideos) => {
            const patch = { recommendedVideos };
            context.patchState(patch);
            this.tryTransferState(patch, VideoStateModel.default);
        });
    }

    @Action(VideoQueries.GetRandomList)
    getRandomList(context: StateContext<VideoStateModel>, query: VideoQueries.GetRandomList) {
        return this._mediator.handlers[VideoQueries.GetRandomList.type](query).then((randomVideos) => {
            const patch = { randomVideos };
            context.patchState(patch);
            this.tryTransferState(patch, VideoStateModel.default);
        });
    }
}