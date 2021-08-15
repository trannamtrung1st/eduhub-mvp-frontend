import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { TransferState } from '@angular/platform-browser';

import { Action, NgxsOnInit, Selector, State, StateContext } from '@ngxs/store';

import { SUBJECT_STATES } from '../constants';

import { SubjectModel } from '../models/subject.model';
import { SubjectQueries } from '../queries/subject.queries';

import { TransferableState } from '@cross/state/transferable-state';

import { MockDatabaseService } from '@persistence/database/mock-database.service';

class AllSubjectsStateModel {

    constructor(public subjects: SubjectModel[] = []) {
    }

    static get default() {
        return new AllSubjectsStateModel();
    }
}

@State<AllSubjectsStateModel>({
    name: SUBJECT_STATES.subject.allSubjects.name,
    defaults: AllSubjectsStateModel.default
})
@Injectable()
export class AllSubjectsState extends TransferableState<AllSubjectsStateModel> implements NgxsOnInit {

    protected transferStateKeyName: string = AllSubjectsState.name;

    constructor(@Inject(PLATFORM_ID) platformId: object,
        transferState: TransferState,
        private _databaseService: MockDatabaseService
    ) {
        super(platformId, transferState);
    }

    ngxsOnInit(ctx?: StateContext<any>) {
        super.ngxsOnInit(ctx);
        const transferredState = AllSubjectsStateModel.default;

        if (this.shouldLoad) {
            this.isPlatformServer && this.setTransferredState(transferredState);
        } else {
            this.patchTransferredState(transferredState);
            ctx?.setState(transferredState);
        }
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
        return Promise.resolve().then(() => {
            let subjects = [...this._databaseService.database.subjects];
            const patch = {
                subjects
            };

            context.patchState(patch);
            this.shouldLoad && this.isPlatformServer
                && this.updateTransferredState((state) => Object.assign(state, patch), AllSubjectsStateModel.default);
        });
    }

}