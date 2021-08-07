import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { TransferState } from '@angular/platform-browser';

import { Action, NgxsOnInit, Selector, State, StateContext } from '@ngxs/store';
import { orderBy } from 'lodash';

import { PostFilterSortBy, POST_STATES } from '../constants';

import { FilterResponseModel } from '@cross/filter/models/filter-response.model';
import { PostModel } from '../models/post.model';
import { PostQueries } from '../queries/post.queries';

import { TransferableState } from '@core/cross/state-transferable/transferable-state';

import { MockDatabaseService } from '@persistence/storage/mock-database.service';

class FilteredPostsStateModel {

    constructor(public posts = new FilterResponseModel<PostModel>()) {
    }

    static get default() {
        return new FilteredPostsStateModel();
    }
}

@State<FilteredPostsStateModel>({
    name: POST_STATES.post.filteredPosts.name,
    defaults: FilteredPostsStateModel.default
})
@Injectable()
export class FilteredPostsState extends TransferableState<FilteredPostsStateModel> implements NgxsOnInit {

    protected transferStateKeyName: string = FilteredPostsStateModel.name;

    constructor(@Inject(PLATFORM_ID) platformId: object,
        transferState: TransferState,
        private _databaseService: MockDatabaseService
    ) {
        super(platformId, transferState);
    }

    ngxsOnInit(ctx?: StateContext<any>) {
        super.ngxsOnInit(ctx);
        const transferredState = FilteredPostsStateModel.default;

        if (this.needInitData) {
            this.isPlatformServer && this.setTransferredState(transferredState);
        } else {
            this.patchTransferredState(transferredState);
            ctx?.setState(transferredState);
        }
    }

    @Selector()
    static posts(state: FilteredPostsStateModel) {
        return state.posts;
    }

    @Action(PostQueries.Filter)
    filter(context: StateContext<FilteredPostsStateModel>, query: PostQueries.Filter) {
        const srcPosts = this._databaseService.database.posts;
        let posts = [...srcPosts];

        if (query.searchTerm) {
            const searchTerm = query.searchTerm?.toLowerCase();
            posts = posts.filter(post => post.title.toLowerCase().includes(searchTerm));
        }

        if (query.subjects?.length) {
            posts = posts.filter(post => query.subjects.includes(post.subjectId));
        }

        switch (query.sortBy) {
            case PostFilterSortBy.Title:
                posts = orderBy(posts, post => post.title, query.isDesc ? 'desc' : 'asc');
                break;
        }

        const totalRecords = posts.length;
        posts = posts.slice(query.skip, query.skip + query.take);
        const patch = {
            posts: {
                records: posts,
                totalRecords
            }
        };

        context.patchState(patch);
        this.needInitData && this.isPlatformServer
            && this.updateTransferredState((state) => Object.assign(state, patch), FilteredPostsStateModel.default);
    }

}