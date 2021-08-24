import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { TransferState } from '@angular/platform-browser';

import { Action, NgxsOnInit, Selector, State, StateContext } from '@ngxs/store';
import { Navigate } from '@ngxs/router-plugin';

import { IDENTITY_STATES } from '../constants';
import { A_ROUTING } from '@app/constants';

import * as IdentityCommands from '../commands/identity.commands';
import * as IdentityQueries from '../queries/identity.queries';
import { IdentityStateModel } from './models/identity-state.model';

import { TransferableState } from '@cross/state/transferable-state';

import { Mediator } from '@core/mediator';

@State<IdentityStateModel>({
    name: IDENTITY_STATES.identity.name,
    defaults: IdentityStateModel.default,
})
@Injectable()
export class IdentityState extends TransferableState<IdentityStateModel> implements NgxsOnInit {

    protected transferStateKeyName: string = IdentityState.name;

    constructor(@Inject(PLATFORM_ID) platformId: object,
        transferState: TransferState,
        private _mediator: Mediator) {
        super(platformId, transferState);
    }

    ngxsOnInit(ctx?: StateContext<any>) {
        super.ngxsOnInit(ctx);
        const isBrowser = !this.isPlatformServer;
        this.initOrPatchState(IdentityStateModel.default, ctx);
        isBrowser && ctx?.dispatch(new IdentityQueries.LoadCurrentUser());
    }


    @Selector()
    static currentUser(state: IdentityStateModel) {
        return state.currentUser;
    }

    @Action(IdentityCommands.Login)
    login(context: StateContext<IdentityStateModel>, cmd: IdentityCommands.Login) {
        return this._mediator.handlers[IdentityCommands.Login.type](cmd).then(user => {
            const patch = { currentUser: user };
            context.patchState(patch);
            this.tryTransferState(patch, IdentityStateModel.default);
        });
    }

    @Action(IdentityCommands.Logout)
    logOut(context: StateContext<IdentityStateModel>, cmd: IdentityCommands.Logout) {
        this._mediator.handlers[IdentityCommands.Logout.type](cmd);
        const patch = { currentUser: undefined };
        context.patchState(patch);
        this.tryTransferState(patch, IdentityStateModel.default);
        context.dispatch(new Navigate([A_ROUTING.platform.home]));
    }

    @Action(IdentityQueries.LoadCurrentUser)
    loadCurrentUser(context: StateContext<IdentityStateModel>, query: IdentityQueries.LoadCurrentUser) {
        const user = this._mediator.handlers[IdentityQueries.LoadCurrentUser.type](query);
        const patch = { currentUser: user || undefined };
        context.patchState(patch);
        this.tryTransferState(patch, IdentityStateModel.default);
    }
}