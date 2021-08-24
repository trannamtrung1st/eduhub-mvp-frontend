import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { TransferState } from '@angular/platform-browser';

import { Action, NgxsOnInit, Selector, State, StateContext } from '@ngxs/store';

import { SUBJECT_STATES } from '../constants';

import { SubjectModel } from './models/subject.model';
import * as SubjectQueries from '../queries/subject.queries';
import { SubjectStateModel } from './models/subject-state.model';

import { TransferableState } from '@cross/state/transferable-state';

import { Mediator } from '@core/mediator';

@State<SubjectStateModel>({
    name: SUBJECT_STATES.subject.name,
    defaults: SubjectStateModel.default
})
@Injectable()
export class SubjectState extends TransferableState<SubjectStateModel> implements NgxsOnInit {

    protected transferStateKeyName: string = SubjectState.name;

    constructor(@Inject(PLATFORM_ID) platformId: object,
        transferState: TransferState,
        private _mediator: Mediator
    ) {
        super(platformId, transferState);
    }

    ngxsOnInit(ctx?: StateContext<any>) {
        super.ngxsOnInit(ctx);
        this.initOrPatchState(SubjectStateModel.default, ctx);
    }

    @Selector()
    static subjects(state: SubjectStateModel) {
        return state.subjects;
    }

    // [TODO]: demo only
    @Selector([SubjectState.subjects])
    static subjectNames(_: SubjectStateModel, subjects: SubjectModel[]) {
        return subjects.map(subject => subject.name);
    }

    @Action(SubjectQueries.GetAll)
    getAll(context: StateContext<SubjectStateModel>, query: SubjectQueries.GetAll) {
        return this._mediator.handlers[SubjectQueries.GetAll.type](query).then((subjects) => {
            const patch = { subjects };
            context.patchState(patch);
            this.tryTransferState(patch, SubjectStateModel.default);
        });
    }
}