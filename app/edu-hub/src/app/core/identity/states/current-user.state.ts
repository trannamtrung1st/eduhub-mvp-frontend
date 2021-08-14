import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { TransferState } from '@angular/platform-browser';

import { Action, NgxsOnInit, Selector, State, StateContext } from '@ngxs/store';
import { Navigate } from '@ngxs/router-plugin';

import { IDENTITY_LOCAL_STORAGE, IDENTITY_STATES } from '../constants';
import { A_ROUTING } from '@app/constants';

import { IdentityCommands } from '../commands/identity.commands';
import { UserModel } from '../models/user-model';

import { TransferableState } from '@cross/state/transferable-state';

import { MockDatabaseService } from '@persistence/database/mock-database.service';
import { BrowserStorageService } from '@persistence/browser/browser-storage.service';

class CurrentUserStateModel {

    constructor(public currentUser?: UserModel) { }

    static get default() {
        return new CurrentUserStateModel();
    }
}

@State<CurrentUserStateModel>({
    name: IDENTITY_STATES.identity.currentUser.name,
    defaults: CurrentUserStateModel.default
})
@Injectable()
export class CurrentUserState extends TransferableState<CurrentUserStateModel> implements NgxsOnInit {

    protected transferStateKeyName: string = CurrentUserState.name;

    constructor(@Inject(PLATFORM_ID) platformId: object,
        transferState: TransferState,
        private _databaseService: MockDatabaseService,
        private _browserStorageService: BrowserStorageService) {
        super(platformId, transferState);
    }

    ngxsOnInit(ctx?: StateContext<any>) {
        super.ngxsOnInit(ctx);
        const transferredState = CurrentUserStateModel.default;
        const isBrowser = !this.isPlatformServer;

        if (this.needInitData) {
            this.isPlatformServer && this.setTransferredState(transferredState);
        } else {
            this.patchTransferredState(transferredState);
            ctx?.setState(transferredState);
        }

        isBrowser && ctx?.dispatch(new IdentityCommands.LoadCurrentUser());
    }

    @Selector()
    static currentUser(state: CurrentUserStateModel) {
        return state.currentUser;
    }

    @Action(IdentityCommands.Login)
    login(context: StateContext<CurrentUserStateModel>, cmd: IdentityCommands.Login) {
        const defaultUser = this._databaseService.database.users[0];

        const patch = {
            currentUser: defaultUser
        };

        this._browserStorageService.setJson(IDENTITY_LOCAL_STORAGE.currentUser.key, defaultUser);

        context.patchState(patch);
        this.needInitData && this.isPlatformServer
            && this.updateTransferredState((state) => Object.assign(state, patch), CurrentUserStateModel.default);
    }

    @Action(IdentityCommands.Logout)
    logOut(context: StateContext<CurrentUserStateModel>, cmd: IdentityCommands.Logout) {
        const patch = {
            currentUser: undefined
        };

        this._browserStorageService.removeItem(IDENTITY_LOCAL_STORAGE.currentUser.key);

        context.patchState(patch);
        this.needInitData && this.isPlatformServer
            && this.updateTransferredState((state) => Object.assign(state, patch), CurrentUserStateModel.default);

        context.dispatch(new Navigate([A_ROUTING.platform.home]));
    }

    @Action(IdentityCommands.LoadCurrentUser)
    loadCurrentUser(context: StateContext<CurrentUserStateModel>, cmd: IdentityCommands.LoadCurrentUser) {
        const currentUser = this._browserStorageService.getItemAs<UserModel>(IDENTITY_LOCAL_STORAGE.currentUser.key);

        const patch = {
            currentUser: currentUser || undefined
        };

        context.patchState(patch);
        this.needInitData && this.isPlatformServer
            && this.updateTransferredState((state) => Object.assign(state, patch), CurrentUserStateModel.default);
    }
}