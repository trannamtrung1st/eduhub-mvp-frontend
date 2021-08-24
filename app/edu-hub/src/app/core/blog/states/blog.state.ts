import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { TransferState } from '@angular/platform-browser';

import { Action, NgxsOnInit, Selector, State, StateContext } from '@ngxs/store';

import { BLOG_STATES } from '../constants';

import { BlogStateModel } from './models/blog-state.model';
import * as BlogQueries from '../queries/blog.queries';

import { TransferableState } from '@cross/state/transferable-state';

import { Mediator } from '@core/mediator';

@State<BlogStateModel>({
    name: BLOG_STATES.blog.name,
    defaults: BlogStateModel.default
})
@Injectable()
export class BlogState extends TransferableState<BlogStateModel> implements NgxsOnInit {

    protected transferStateKeyName: string = BlogState.name;

    constructor(@Inject(PLATFORM_ID) platformId: object,
        transferState: TransferState,
        private _mediator: Mediator
    ) {
        super(platformId, transferState);
    }

    ngxsOnInit(ctx?: StateContext<any>) {
        super.ngxsOnInit(ctx);
        this.initOrPatchState(BlogStateModel.default, ctx);
    }

    @Selector()
    static filteredBlogs(state: BlogStateModel) {
        return state.filteredBlogs;
    }

    @Selector()
    static recommendedBlogs(state: BlogStateModel) {
        return state.recommendedBlogs;
    }

    @Selector()
    static randomBlogs(state: BlogStateModel) {
        return state.randomBlogs;
    }

    @Action(BlogQueries.Filter)
    filter(context: StateContext<BlogStateModel>, query: BlogQueries.Filter) {
        return this._mediator.handlers[BlogQueries.Filter.type](query).then(filteredBlogs => {
            const patch = { filteredBlogs };
            context.patchState(patch);
            this.tryTransferState(patch, BlogStateModel.default);
        });
    }

    @Action(BlogQueries.GetRecommended)
    getRecommended(context: StateContext<BlogStateModel>, query: BlogQueries.GetRecommended) {
        return this._mediator.handlers[BlogQueries.GetRecommended.type](query).then(blogs => {
            const patch = { recommendedBlogs: blogs };
            context.patchState(patch);
            this.tryTransferState(patch, BlogStateModel.default);
        });
    }

    @Action(BlogQueries.GetRandom)
    getRandomList(context: StateContext<BlogStateModel>, query: BlogQueries.GetRandom) {
        return this._mediator.handlers[BlogQueries.GetRandom.type](query).then(blogs => {
            const patch = { randomBlogs: blogs };
            context.patchState(patch);
            this.tryTransferState(patch, BlogStateModel.default);
        });
    }
}