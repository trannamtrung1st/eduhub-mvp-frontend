import { Injectable } from '@angular/core';

import { Action, Selector, State, StateContext } from '@ngxs/store';

import { SUBJECT_STATES } from '../constants';

import { SubjectModel } from '../models/subject.model';
import { SubjectQueries } from '../queries/subject.queries';

import { MockDatabaseService } from '@persistence/storage/mock-database.service';

@State<SubjectModel[]>({
    name: SUBJECT_STATES.subject.allSubjects.name,
    defaults: []
})
@Injectable()
export class AllSubjectsState {

    constructor(private _databaseService: MockDatabaseService) {
    }

    // [TODO]: demo only
    @Selector()
    static names(subjects: SubjectModel[]) {
        return subjects.map(subject => subject.name);
    }

    @Action(SubjectQueries.GetAll)
    getAll(context: StateContext<SubjectModel[]>) {
        let subjects = [...this._databaseService.database.subjects];
        context.setState(subjects);
    }

}