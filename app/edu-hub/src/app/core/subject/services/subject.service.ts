import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { CoreModule } from '@core/core.module';

import { SubjectModel } from '../queries/subject.model';
import { GetAllSubjectQuery } from '../queries/get-all-subject.query';

import { MockDatabaseService } from '@persistence/storage/mock-database.service';

@Injectable({
  providedIn: CoreModule
})
export class SubjectService {

  constructor(private _databaseService: MockDatabaseService) { }

  getAll(_: GetAllSubjectQuery): Observable<SubjectModel[]> {
    let subjects = [...this._databaseService.database.subjects];
    return of(subjects);
  }
}
