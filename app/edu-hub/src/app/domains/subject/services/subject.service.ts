import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { MockSubject } from '../models/mock-subject.model';

import { MockDatabaseService } from '@app/services/mock-database.service';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {

  constructor(private _databaseService: MockDatabaseService) { }

  getAll(): Observable<MockSubject[]> {
    let subjects = [...this._databaseService.database.subjects];
    return of(subjects);
  }
}
