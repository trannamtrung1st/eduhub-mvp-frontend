import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

import { Action, Selector, State, StateContext } from '@ngxs/store';

import { GLOBAL_STATES } from '../constants';

import { GlobalCommands } from '../commands/global.commands';

import { LoaderState } from './loader.state';

export const APP_STATUS_STATES = GLOBAL_STATES.global.states.appStatus;

class GlobalStateModel {

    constructor(public appStatus: string = APP_STATUS_STATES.unset) { }
}

@State<GlobalStateModel>({
    name: GLOBAL_STATES.global.name,
    defaults: new GlobalStateModel(),
    children: [
        LoaderState
    ]
})
@Injectable()
export class GlobalState {

    constructor(@Inject(PLATFORM_ID) private _platformId: object) {
    }

    @Selector()
    static appStatus(state: GlobalStateModel) {
        return state.appStatus;
    }

    @Action(GlobalCommands.ChangeAppStatus)
    changeAppStatus(context: StateContext<GlobalStateModel>, cmd: GlobalCommands.ChangeAppStatus) {
        const changeStatus = () => {
            context.patchState({
                appStatus: cmd.appStatus
            });
        };

        if (isPlatformBrowser(this._platformId)) {
            setTimeout(changeStatus);
        } else {
            changeStatus();
        }
    }

}