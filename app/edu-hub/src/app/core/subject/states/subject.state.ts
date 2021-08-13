import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { TransferState } from '@angular/platform-browser';

import { NgxsOnInit, State, StateContext } from '@ngxs/store';

import { SUBJECT_STATES } from '../constants';

import { TransferableState } from '@cross/state/transferable-state';
import { AllSubjectsState } from './all-subjects.state';

class SubjectStateModel {
    static get default() {
        return new SubjectStateModel();
    }
}

@State<SubjectStateModel>({
    name: SUBJECT_STATES.subject.name,
    defaults: SubjectStateModel.default,
    children: [
        AllSubjectsState
    ]
})
@Injectable()
export class SubjectState extends TransferableState<SubjectStateModel> implements NgxsOnInit {

    protected transferStateKeyName: string = SubjectState.name;

    constructor(@Inject(PLATFORM_ID) platformId: object,
        transferState: TransferState
    ) {
        super(platformId, transferState);
    }

    ngxsOnInit(ctx?: StateContext<any>) {
        super.ngxsOnInit(ctx);
        const transferredState = SubjectStateModel.default;

        if (this.needInitData) {
            this.isPlatformServer && this.setTransferredState(transferredState);
        } else {
            this.patchTransferredState(transferredState);
            ctx?.setState(transferredState);
        }
    }
}