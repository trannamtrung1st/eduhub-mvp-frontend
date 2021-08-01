import { Injectable } from '@angular/core';

import { State } from '@ngxs/store';

import { VIDEO_STATES } from '../constants';

import { VideoStateModel } from '../models/video-state.model';

@State<VideoStateModel>({
    name: VIDEO_STATES.video.name,
    defaults: {}
})
@Injectable()
export class VideoState {
}