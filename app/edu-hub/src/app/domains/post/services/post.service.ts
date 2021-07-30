import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { orderBy } from 'lodash';

import { PostFilterSortBy } from '../constants';

import { MockPost } from '../models/mock-post.model';
import { PostFilterRequestModel } from '../models/post-filter-request.model';
import { FilterResponseModel } from '@app/cross/filter/models/filter-response.model';

import { MockDatabaseService } from 'src/app/services/mock-database.service';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private _databaseService: MockDatabaseService) { }

  filter(requestModel: PostFilterRequestModel): Observable<FilterResponseModel<MockPost>> {
    const srcPosts = this._databaseService.database.posts;
    let posts = [...srcPosts];

    if (requestModel.searchTerm) {
      const searchTerm = requestModel.searchTerm?.toLowerCase();
      posts = posts.filter(post => post.title.toLowerCase().includes(searchTerm));
    }

    if (requestModel.subjects?.length) {
      posts = posts.filter(post => requestModel.subjects.includes(post.subjectId));
    }

    switch (requestModel.sortBy) {
      case PostFilterSortBy.Title:
        posts = orderBy(posts, post => post.title, requestModel.isDesc ? 'desc' : 'asc');
        break;
    }

    const totalRecords = posts.length;
    posts = posts.slice(requestModel.skip, requestModel.skip + requestModel.take);
    return of({
      records: posts,
      totalRecords
    });
  }
}
