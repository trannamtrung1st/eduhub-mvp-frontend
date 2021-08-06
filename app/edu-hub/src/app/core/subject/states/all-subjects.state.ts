import { Injectable } from '@angular/core';

import { Action, Selector, State, StateContext } from '@ngxs/store';

import { SUBJECT_STATES } from '../constants';

import { SubjectModel } from '../models/subject.model';
import { SubjectQueries } from '../queries/subject.queries';

import { MockDatabaseService } from '@persistence/storage/mock-database.service';

class AllSubjectsStateModel {

    constructor(public subjects: SubjectModel[] = []) {
    }
}

@State<AllSubjectsStateModel>({
    name: SUBJECT_STATES.subject.allSubjects.name,
    defaults: new AllSubjectsStateModel()
})
@Injectable()
export class AllSubjectsState {

    constructor(private _databaseService: MockDatabaseService) {
    }

    @Selector()
    static subjects(state: AllSubjectsStateModel) {
        return state.subjects;
    }

    // [TODO]: demo only
    @Selector([AllSubjectsState.subjects])
    static subjectNames(_: AllSubjectsStateModel, subjects: SubjectModel[]) {
        return subjects.map(subject => subject.name);
    }

    @Action(SubjectQueries.GetAll)
    getAll(context: StateContext<AllSubjectsStateModel>) {
        let subjects = [...this._databaseService.database.subjects];
        context.patchState({
            subjects
        });
    }

}