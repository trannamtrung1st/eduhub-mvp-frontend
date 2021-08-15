import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { TransferState } from '@angular/platform-browser';

import { Action, NgxsOnInit, Selector, State, StateContext } from '@ngxs/store';

import { GLOBAL_STATES } from '../constants';

import { ManagementMenuCommands } from '../commands/management-menu.commands';

import { TransferableState } from '@cross/state/transferable-state';

class ManagementMenuStateModel {

    constructor(public currentMenuId: string = '') { }

    static get default() {
        return new ManagementMenuStateModel();
    }
}

@State<ManagementMenuStateModel>({
    name: GLOBAL_STATES.global.managementMenu.name,
    defaults: ManagementMenuStateModel.default
})
@Injectable()
export class ManagementMenuState extends TransferableState<ManagementMenuStateModel> implements NgxsOnInit {

    protected transferStateKeyName: string = ManagementMenuState.name;

    constructor(@Inject(PLATFORM_ID) platformId: object,
        transferState: TransferState
    ) {
        super(platformId, transferState);
    }

    ngxsOnInit(ctx?: StateContext<any>) {
        super.ngxsOnInit(ctx);
        const transferredState = ManagementMenuStateModel.default;

        if (this.shouldLoad) {
            this.isPlatformServer && this.setTransferredState(transferredState);
        } else {
            this.patchTransferredState(transferredState);
            ctx?.setState(transferredState);
        }
    }

    @Selector()
    static currentMenuId(state: ManagementMenuStateModel) {
        return state.currentMenuId;
    }

    @Action(ManagementMenuCommands.SetCurrent)
    setCurrent(context: StateContext<ManagementMenuStateModel>, cmd: ManagementMenuCommands.SetCurrent) {
        const patch = {
            currentMenuId: cmd.currentMenuId
        };

        context.patchState(patch);
        this.shouldLoad && this.isPlatformServer &&
            this.updateTransferredState((state) => Object.assign(state, patch), ManagementMenuStateModel.default);
    }

}