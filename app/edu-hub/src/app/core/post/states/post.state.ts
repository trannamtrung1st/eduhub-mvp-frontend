import { Injectable } from '@angular/core';

import { State } from '@ngxs/store';

import { POST_STATES } from '../constants';

import { PostStateModel } from '../models/post-state.model';

@State<PostStateModel>({
    name: POST_STATES.post.name,
    defaults: {}
})
@Injectable()
export class PostState {
}