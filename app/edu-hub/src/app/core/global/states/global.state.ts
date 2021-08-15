import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { TransferState } from '@angular/platform-browser';

import { Action, NgxsOnInit, Selector, State, StateContext } from '@ngxs/store';

import { GLOBAL_STATES } from '../constants';

import { GlobalCommands } from '../commands/global.commands';

import { TransferableState } from '@cross/state/transferable-state';
import { LoaderState } from './loader.state';
import { ManagementMenuState } from './management-menu.state';

export const APP_STATUS_STATES = GLOBAL_STATES.global.states.appStatus;

class GlobalStateModel {

    constructor(public appStatus: string = APP_STATUS_STATES.unset) { }

    static get default() {
        return new GlobalStateModel();
    }
}

@State<GlobalStateModel>({
    name: GLOBAL_STATES.global.name,
    defaults: GlobalStateModel.default,
    children: [
        LoaderState,
        ManagementMenuState
    ]
})
@Injectable()
export class GlobalState extends TransferableState<GlobalStateModel> implements NgxsOnInit {

    protected transferStateKeyName: string = GlobalState.name;

    constructor(@Inject(PLATFORM_ID) platformId: object,
        transferState: TransferState
    ) {
        super(platformId, transferState);
    }

    ngxsOnInit(ctx?: StateContext<any>) {
        super.ngxsOnInit(ctx);
        const transferredState = GlobalStateModel.default;

        if (this.shouldLoad) {
            this.isPlatformServer && this.setTransferredState(transferredState);
        } else {
            this.patchTransferredState(transferredState);
            ctx?.setState(transferredState);
        }
    }

    @Selector()
    static appStatus(state: GlobalStateModel) {
        return state.appStatus;
    }

    @Action(GlobalCommands.ChangeAppStatus)
    changeAppStatus(context: StateContext<GlobalStateModel>, cmd: GlobalCommands.ChangeAppStatus) {
        const patch = {
            appStatus: cmd.appStatus
        };

        context.patchState(patch);
        this.shouldLoad && this.isPlatformServer &&
            this.updateTransferredState((state) => Object.assign(state, patch), GlobalStateModel.default);
    }

}