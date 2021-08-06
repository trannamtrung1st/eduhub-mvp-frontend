import { Injectable } from '@angular/core';

import { State } from '@ngxs/store';

import { VIDEO_STATES } from '../constants';

class VideoStateModel {
}

@State<VideoStateModel>({
    name: VIDEO_STATES.video.name,
})
@Injectable()
export class VideoState {
}