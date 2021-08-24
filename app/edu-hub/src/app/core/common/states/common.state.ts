import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { TransferState } from '@angular/platform-browser';

import { Action, NgxsOnInit, Selector, State, StateContext } from '@ngxs/store';

import { DEFAULT_VISIBLE_STATE } from '@cross/animation/animation-helper';

import { GLOBAL_STATES } from '../constants';

import * as CommonCommands from '../commands/common.commands';
import * as CommonEvents from '../events/common.events';
import { CommonStateModel } from './models/common-state.model';

import { TransferableState } from '@cross/state/transferable-state';

export const APP_STATUS_STATES = GLOBAL_STATES.global.states.appStatus;

@State<CommonStateModel>({
    name: GLOBAL_STATES.global.name,
    defaults: CommonStateModel.default,
})
@Injectable()
export class CommonState extends TransferableState<CommonStateModel> implements NgxsOnInit {

    protected transferStateKeyName: string = CommonState.name;

    constructor(@Inject(PLATFORM_ID) platformId: object,
        transferState: TransferState
    ) {
        super(platformId, transferState);
    }

    ngxsOnInit(ctx?: StateContext<any>) {
        super.ngxsOnInit(ctx);
        this.initOrPatchState(CommonStateModel.default, ctx);
    }

    @Selector()
    static appStatus(state: CommonStateModel) {
        return state.appStatus;
    }

    @Selector()
    static loaderVisible(state: CommonStateModel): boolean {
        return state.loaderVisible;
    }

    @Selector()
    static loaderVisibilityState(state: CommonStateModel): string {
        return state.loaderVisibilityState;
    }

    @Action(CommonCommands.ShowLoader)
    showLoader(context: StateContext<CommonStateModel>, cmd: CommonCommands.ShowLoader) {
        return Promise.resolve().then(() => {
            context.patchState({
                loaderVisibilityState: cmd.visibleState
            });
        });
    }

    @Action(CommonCommands.HideLoader)
    hideLoader(context: StateContext<CommonStateModel>, cmd: CommonCommands.HideLoader) {
        return Promise.resolve().then(() => {
            context.patchState({
                loaderVisibilityState: cmd.hiddenState
            });
        });
    }

    @Action(CommonEvents.LoaderAnimationDone)
    handleLoaderAnimationDone(context: StateContext<CommonStateModel>, event: CommonEvents.LoaderAnimationDone) {
        let loaderVisible = null;

        switch (event.event.toState) {
            case event.hiddenState:
                loaderVisible = false;
                break;
            case event.visibleState:
                loaderVisible = true;
                break;
        }

        loaderVisible !== null && context.patchState({
            loaderVisible
        });
    }

    @Action(CommonCommands.ResetLoader)
    resetLoader(context: StateContext<CommonStateModel>, _: CommonCommands.ResetLoader) {
        context.patchState({
            loaderVisible: true,
            loaderVisibilityState: DEFAULT_VISIBLE_STATE
        });
    }

    @Action(CommonCommands.ChangeAppStatus)
    changeAppStatus(context: StateContext<CommonStateModel>, cmd: CommonCommands.ChangeAppStatus) {
        const patch = { appStatus: cmd.appStatus };
        context.patchState(patch);
        this.tryTransferState(patch, CommonStateModel.default);
    }
}