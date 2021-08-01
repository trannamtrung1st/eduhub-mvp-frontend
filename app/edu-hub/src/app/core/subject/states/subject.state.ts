import { Injectable } from '@angular/core';

import { State } from '@ngxs/store';

import { SUBJECT_STATES } from '../constants';

import { SubjectStateModel } from '../models/subject-state.model';

import { AllSubjectsState } from './all-subjects.state';

@State<SubjectStateModel>({
    name: SUBJECT_STATES.subject.name,
    defaults: {},
    children: [
        AllSubjectsState
    ]
})
@Injectable()
export class SubjectState {
}