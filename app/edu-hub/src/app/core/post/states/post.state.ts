import { Injectable } from '@angular/core';

import { State } from '@ngxs/store';

import { POST_STATES } from '../constants';

class PostStateModel {
}

@State<PostStateModel>({
    name: POST_STATES.post.name,
    defaults: {}
})
@Injectable()
export class PostState {
}