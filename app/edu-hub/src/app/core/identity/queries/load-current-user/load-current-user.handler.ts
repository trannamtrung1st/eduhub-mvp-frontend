import { Injectable } from "@angular/core";

import { CoreModule } from "@core/core.module";

import { IDENTITY_LOCAL_STORAGE } from "@core/identity/constants";

import { LoadCurrentUserQuery } from "./load-current-user.query";
import { UserModel } from "@core/identity/states/models/user-model";

import { BrowserStorageService } from "@persistence/browser/browser-storage.service";

@Injectable({
    providedIn: CoreModule
})
export class LoadCurrentUserHandler {

    constructor(private _browserStorageService: BrowserStorageService) {
    }

    handle(request: LoadCurrentUserQuery) {
        const currentUser = this._browserStorageService.getItemAs<UserModel>(IDENTITY_LOCAL_STORAGE.currentUser.key);
        return currentUser;
    }
}