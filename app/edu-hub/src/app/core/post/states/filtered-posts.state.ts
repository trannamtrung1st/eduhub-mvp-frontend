import { Injectable } from '@angular/core';

import { Action, State, StateContext } from '@ngxs/store';
import { orderBy } from 'lodash';

import { PostFilterSortBy, POST_STATES } from '../constants';

import { FilterResponseModel } from '@cross/filter/models/filter-response.model';
import { PostModel } from '../models/post.model';
import { PostQueries } from '../queries/post.queries';

import { MockDatabaseService } from '@persistence/storage/mock-database.service';

@State<FilterResponseModel<PostModel>>({
    name: POST_STATES.post.filteredPosts.name,
    defaults: new FilterResponseModel<PostModel>()
})
@Injectable()
export class FilteredPostsState {

    constructor(private _databaseService: MockDatabaseService) {
    }

    @Action(PostQueries.Filter)
    filter(context: StateContext<FilterResponseModel<PostModel>>, query: PostQueries.Filter) {
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

        context.setState({
            records: posts,
            totalRecords
        });
    }

}