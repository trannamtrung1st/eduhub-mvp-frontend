import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { orderBy } from 'lodash';

import { CoreModule } from '@core/core.module';

import { VideoFilterSortBy } from '../constants';

import { VideoModel } from '../queries/video.model';
import { VideoFilterQuery } from '../queries/video-filter.query';
import { FilterResponseModel } from '@cross/filter/models/filter-response.model';

import { MockDatabaseService } from '@persistence/storage/mock-database.service';

@Injectable({
  providedIn: CoreModule
})
export class VideoService {

  constructor(private _databaseService: MockDatabaseService) { }

  filter(query: VideoFilterQuery): Observable<FilterResponseModel<VideoModel>> {
    const srcVideos = this._databaseService.database.videos;
    let videos = [...srcVideos];

    if (query.searchTerm) {
      const searchTerm = query.searchTerm?.toLowerCase();
      videos = videos.filter(video => video.title.toLowerCase().includes(searchTerm));
    }

    if (query.subjects?.length) {
      videos = videos.filter(video => query.subjects.includes(video.subjectId));
    }

    switch (query.sortBy) {
      case VideoFilterSortBy.Title:
        videos = orderBy(videos, video => video.title, query.isDesc ? 'desc' : 'asc');
        break;
    }

    const totalRecords = videos.length;
    videos = videos.slice(query.skip, query.skip + query.take);
    return of({
      records: videos,
      totalRecords
    });
  }
}
