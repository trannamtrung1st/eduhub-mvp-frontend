import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { TransferState } from '@angular/platform-browser';

import { Action, NgxsOnInit, Selector, State, StateContext } from '@ngxs/store';
import { orderBy, random } from 'lodash';

import { BlogFilterSortBy, BLOG_STATES } from '../constants';

import { FilterResponseModel } from '@cross/filter/models/filter-response.model';
import { BlogModel } from '../models/blog.model';
import { BlogQueries } from '../queries/blog.queries';

import { TransferableState } from '@cross/state/transferable-state';

import { MockDatabaseService } from '@persistence/database/mock-database.service';

class BlogListStateModel {

    constructor(public blogs = new FilterResponseModel<BlogModel>(),
        public recommendedBlogs: BlogModel[] = [],
        public randomBlogs: BlogModel[] = []) {
    }

    static get default() {
        return new BlogListStateModel();
    }
}

@State<BlogListStateModel>({
    name: BLOG_STATES.blog.blogList.name,
    defaults: BlogListStateModel.default
})
@Injectable()
export class BlogListState extends TransferableState<BlogListStateModel> implements NgxsOnInit {

    protected transferStateKeyName: string = BlogListStateModel.name;

    constructor(@Inject(PLATFORM_ID) platformId: object,
        transferState: TransferState,
        private _databaseService: MockDatabaseService
    ) {
        super(platformId, transferState);
    }

    ngxsOnInit(ctx?: StateContext<any>) {
        super.ngxsOnInit(ctx);
        const transferredState = BlogListStateModel.default;

        if (this.shouldLoad) {
            this.isPlatformServer && this.setTransferredState(transferredState);
        } else {
            this.patchTransferredState(transferredState);
            ctx?.setState(transferredState);
        }
    }

    @Selector()
    static blogs(state: BlogListStateModel) {
        return state.blogs;
    }

    @Selector()
    static recommendedBlogs(state: BlogListStateModel) {
        return state.recommendedBlogs;
    }

    @Selector()
    static randomBlogs(state: BlogListStateModel) {
        return state.randomBlogs;
    }

    @Action(BlogQueries.Filter)
    filter(context: StateContext<BlogListStateModel>, query: BlogQueries.Filter) {
        return Promise.resolve().then(() => {
            const srcBlogs = this._databaseService.database.blogs;
            let blogs = [...srcBlogs];

            if (query.searchTerm) {
                const searchTerm = query.searchTerm?.toLowerCase();
                blogs = blogs.filter(blog => blog.title.toLowerCase().includes(searchTerm));
            }

            if (query.subjects?.length) {
                blogs = blogs.filter(blog => query.subjects.includes(blog.subjectId));
            }

            switch (query.sortBy) {
                case BlogFilterSortBy.Title:
                    blogs = orderBy(blogs, blog => blog.title, query.isDesc ? 'desc' : 'asc');
                    break;
            }

            const totalRecords = blogs.length;
            blogs = blogs.slice(query.skip, query.skip + query.take);
            const patch = {
                blogs: {
                    records: blogs,
                    totalRecords
                }
            };

            context.patchState(patch);
            this.shouldLoad && this.isPlatformServer
                && this.updateTransferredState((state) => Object.assign(state, patch), BlogListStateModel.default);
        });
    }

    @Action(BlogQueries.GetRecommended)
    getRecommended(context: StateContext<BlogListStateModel>, query: BlogQueries.GetRecommended) {
        return Promise.resolve().then(() => {
            const srcBlogs = this._databaseService.database.blogs;
            let blogs = [...srcBlogs].splice(0, 10);

            const patch = {
                recommendedBlogs: blogs
            };

            context.patchState(patch);
            this.shouldLoad && this.isPlatformServer
                && this.updateTransferredState((state) => Object.assign(state, patch), BlogListStateModel.default);
        });
    }

    @Action(BlogQueries.GetRandomList)
    getRandomList(context: StateContext<BlogListStateModel>, query: BlogQueries.GetRandomList) {
        return Promise.resolve().then(() => {
            const srcBlogs = this._databaseService.database.blogs;
            let blogs = [...srcBlogs].splice(0, random(srcBlogs.length));

            const patch = {
                randomBlogs: blogs
            };

            context.patchState(patch);
            this.shouldLoad && this.isPlatformServer
                && this.updateTransferredState((state) => Object.assign(state, patch), BlogListStateModel.default);
        });
    }
}