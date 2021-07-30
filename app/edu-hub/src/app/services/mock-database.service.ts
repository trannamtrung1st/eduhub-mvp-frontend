import { Injectable } from '@angular/core';

import { DEFAULT_POST_THUMB } from '@domains/post/constants';
import { DEFAULT_VIDEO_THUMB } from '@domains/video/constants';

import { MockPost } from '@domains/post/models/mock-post.model';
import { MockVideo } from '@domains/video/models/mock-video.model';
import { MockSubject } from '@app/domains/subject/models/mock-subject.model';

@Injectable({
  providedIn: 'root'
})
export class MockDatabaseService {
  private _database: MockDatabase;

  constructor() {
    this._database = new MockDatabase();
  }

  get database(): MockDatabase {
    return this._database;
  }
}

export class MockDatabase {
  private _posts: MockPost[];
  private _videos: MockVideo[];
  private _subjects: MockSubject[];

  constructor() {
    this._posts = [];
    this._videos = [];
    this._subjects = [
      "Aec",
      "Architecture & construction",
      "Business professional",
      "Creative professional",
      "Data professional",
      "IT ops",
      "Manufacturing & design",
      "Information & cyber security",
      "Software developer",
      "Software development",
      "Web development"
    ].map((name, idx) => ({ id: idx, name }));

    const totalRecords = 100;
    [...Array(totalRecords).keys()].forEach((idx) => {
      const currentSubjectId = idx < this._subjects.length ? idx : idx % this._subjects.length;

      this._videos.push({
        title: `Web Master ${idx}`,
        author: `Author ${idx}`,
        thumbnailUrl: DEFAULT_VIDEO_THUMB,
        subjectId: currentSubjectId
      });

      this._posts.push({
        title: `How to become a Master ${idx}`,
        thumbnailUrl: DEFAULT_POST_THUMB,
        createdTime: new Date(),
        commentCount: Math.round(Math.random() * 1000),
        description: 'Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.',
        subjectId: currentSubjectId
      });
    });
  }

  get posts(): MockPost[] {
    return this._posts;
  }
  get videos(): MockVideo[] {
    return this._videos;
  }
  get subjects(): MockSubject[] {
    return this._subjects;
  }
}