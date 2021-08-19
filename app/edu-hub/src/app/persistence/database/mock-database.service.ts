import { Injectable } from '@angular/core';

import { PersistenceModule } from '@persistence/persistence.module';

import { DEFAULT_BLOG_THUMB } from '@domains/blog/constants';
import { DEFAULT_STREAM_URL, DEFAULT_VIDEO_DESCRIPTION, DEFAULT_VIDEO_THUMB } from '@domains/video/constants';
import { DEFAULT_AVATAR } from '@domains/identity/constants';

import { MockBlog } from '@domains/blog/mock-blog.model';
import { MockSubject } from '@domains/subject/mock-subject.model';
import { MockVideo } from '@domains/video/mock-video.model';
import { MockUser } from '@domains/identity/mock-user.model';

@Injectable({
  providedIn: PersistenceModule
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
  private _blogs: MockBlog[];
  private _videos: MockVideo[];
  private _subjects: MockSubject[];
  private _users: MockUser[];

  constructor() {
    this._blogs = [];
    this._videos = [];
    this._users = [{
      id: '1',
      address: '14 KNT Q6 Bình Tân',
      emailAddress: 'trannamtrung1st@gmail.com',
      fullName: 'Trung Tran',
      phoneNumber: '0765441077',
      username: 'trung.tran',
      avatar: DEFAULT_AVATAR
    }];
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
        id: `${idx + 1}`,
        title: `Web Master ${idx}`,
        author: `Author ${idx}`,
        thumbnailUrl: DEFAULT_VIDEO_THUMB,
        streamUrl: DEFAULT_STREAM_URL,
        subjectId: currentSubjectId,
        description: DEFAULT_VIDEO_DESCRIPTION
      });

      this._blogs.push({
        id: `${idx + 1}`,
        title: `How to become a Master ${idx}`,
        thumbnailUrl: DEFAULT_BLOG_THUMB,
        createdTime: new Date(),
        commentCount: Math.round(Math.random() * 1000),
        description: `Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.
        Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.
        Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.`,
        subjectId: currentSubjectId
      });
    });
  }

  get blogs(): MockBlog[] {
    return this._blogs;
  }
  get videos(): MockVideo[] {
    return this._videos;
  }
  get subjects(): MockSubject[] {
    return this._subjects;
  }
  get users(): MockUser[] {
    return this._users;
  }
}