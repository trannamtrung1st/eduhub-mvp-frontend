import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { orderBy } from 'lodash';

import { CoreModule } from '@core/core.module';

import { PostFilterSortBy } from '../constants';

import { PostModel } from '../queries/post.model';
import { PostFilterQuery } from '../queries/post-filter.query';
import { FilterResponseModel } from '@cross/filter/models/filter-response.model';

import { MockDatabaseService } from '@persistence/storage/mock-database.service';

@Injectable({
  providedIn: CoreModule
})
export class PostService {

  constructor(private _databaseService: MockDatabaseService) { }

  filter(query: PostFilterQuery): Observable<FilterResponseModel<PostModel>> {
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
    return of({
      records: posts,
      totalRecords
    });
  }
}
