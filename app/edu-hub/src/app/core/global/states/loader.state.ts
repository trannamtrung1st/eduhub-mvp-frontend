import { Inject, Injectable, PLATFORM_ID } from '@angular/core';

import { Action, Selector, State, StateContext } from '@ngxs/store';

import { DEFAULT_VISIBLE_STATE } from '@cross/animation/animation-helper';

import { GLOBAL_STATES } from '../constants';

import { LoaderCommands } from '../commands/loader.commands';
import { isPlatformBrowser } from '@angular/common';

class LoaderStateModel {

    constructor(public visible = true, public visibilityState = DEFAULT_VISIBLE_STATE) { }
}

@State<LoaderStateModel>({
    name: GLOBAL_STATES.global.loader.name,
    defaults: new LoaderStateModel()
})
@Injectable()
export class LoaderState {

    constructor(@Inject(PLATFORM_ID) private _platformId: object) {
    }

    @Selector()
    static visible(state: LoaderStateModel): boolean {
        return state.visible;
    }

    @Selector()
    static visibilityState(state: LoaderStateModel): string {
        return state.visibilityState;
    }

    @Action(LoaderCommands.Show)
    show(context: StateContext<LoaderStateModel>, cmd: LoaderCommands.Show) {
        const show = () => {
            context.patchState({
                visibilityState: cmd.visibleState
            })
        };

        if (isPlatformBrowser(this._platformId)) {
            setTimeout(show);
        } else {
            show();
        }
    }

    @Action(LoaderCommands.Hide)
    hide(context: StateContext<LoaderStateModel>, cmd: LoaderCommands.Hide) {
        const hide = () => {
            context.patchState({
                visibilityState: cmd.hiddenState
            });
        };

        if (isPlatformBrowser(this._platformId)) {
            setTimeout(hide);
        } else {
            hide();
        }
    }

    @Action(LoaderCommands.AnimationDone)
    animationDone(context: StateContext<LoaderStateModel>, cmd: LoaderCommands.AnimationDone) {
        let visible = null;

        switch (cmd.event.toState) {
            case cmd.hiddenState:
                visible = false;
                break;
            case cmd.visibleState:
                visible = true;
                break;
        }

        visible !== null && context.patchState({
            visible
        });
    }

    @Action(LoaderCommands.Reset)
    reset(context: StateContext<LoaderStateModel>, _: LoaderCommands.Reset) {
        context.setState(new LoaderStateModel());
    }
}