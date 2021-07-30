import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { orderBy } from 'lodash';

import { VideoFilterSortBy } from '../constants';

import { MockVideo } from '../models/mock-video.model';
import { VideoFilterRequestModel } from '../models/video-filter-request.model';
import { FilterResponseModel } from '@app/cross/filter/models/filter-response.model';

import { MockDatabaseService } from '@app/services/mock-database.service';

@Injectable({
  providedIn: 'root'
})
export class VideoService {

  constructor(private _databaseService: MockDatabaseService) { }

  filter(requestModel: VideoFilterRequestModel): Observable<FilterResponseModel<MockVideo>> {
    const srcVideos = this._databaseService.database.videos;
    let videos = [...srcVideos];

    if (requestModel.searchTerm) {
      const searchTerm = requestModel.searchTerm?.toLowerCase();
      videos = videos.filter(video => video.title.toLowerCase().includes(searchTerm));
    }

    if (requestModel.subjects?.length) {
      videos = videos.filter(video => requestModel.subjects.includes(video.subjectId));
    }

    switch (requestModel.sortBy) {
      case VideoFilterSortBy.Title:
        videos = orderBy(videos, video => video.title, requestModel.isDesc ? 'desc' : 'asc');
        break;
    }

    const totalRecords = videos.length;
    videos = videos.slice(requestModel.skip, requestModel.skip + requestModel.take);
    return of({
      records: videos,
      totalRecords
    });
  }
}
