import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { TransferState } from '@angular/platform-browser';

import { Action, NgxsOnInit, Selector, State, StateContext } from '@ngxs/store';

import { DEFAULT_VISIBLE_STATE } from '@cross/animation/animation-helper';

import { GLOBAL_STATES } from '../constants';

import { LoaderCommands } from '../commands/loader.commands';

import { TransferableState } from '@cross/state/transferable-state';

class LoaderStateModel {

    constructor(public visible = true, public visibilityState = DEFAULT_VISIBLE_STATE) { }

    static get default() {
        return new LoaderStateModel();
    }
}

@State<LoaderStateModel>({
    name: GLOBAL_STATES.global.loader.name,
    defaults: LoaderStateModel.default
})
@Injectable()
export class LoaderState extends TransferableState<LoaderStateModel> implements NgxsOnInit {

    protected transferStateKeyName: string = LoaderState.name;

    constructor(@Inject(PLATFORM_ID) platformId: object,
        transferState: TransferState
    ) {
        super(platformId, transferState);
    }

    ngxsOnInit(ctx?: StateContext<any>) {
        super.ngxsOnInit(ctx);
        const transferredState = LoaderStateModel.default;

        if (this.shouldLoad) {
            this.isPlatformServer && this.setTransferredState(transferredState);
        } else {
            this.patchTransferredState(transferredState);
            ctx?.setState(transferredState);
        }
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
        return Promise.resolve().then(() => {
            context.patchState({
                visibilityState: cmd.visibleState
            });
        });
    }

    @Action(LoaderCommands.Hide)
    hide(context: StateContext<LoaderStateModel>, cmd: LoaderCommands.Hide) {
        return Promise.resolve().then(() => {
            context.patchState({
                visibilityState: cmd.hiddenState
            });
        });
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