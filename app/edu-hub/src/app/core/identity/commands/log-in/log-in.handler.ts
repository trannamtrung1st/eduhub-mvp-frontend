import { Injectable } from "@angular/core";

import { CoreModule } from "@core/core.module";

import { IDENTITY_LOCAL_STORAGE } from "@core/identity/constants";

import { LoginCommand } from "./log-in.command";

import { BrowserStorageService } from "@persistence/browser/browser-storage.service";
import { MockDatabaseService } from "@persistence/database/mock-database.service";

@Injectable({
    providedIn: CoreModule
})
export class LoginHandler {

    constructor(private _browserStorageService: BrowserStorageService,
        private _databaseService: MockDatabaseService) {
    }

    handle(request: LoginCommand) {
        return Promise.resolve().then(() => {
            const defaultUser = this._databaseService.database.users[0];
            this._browserStorageService.setJson(IDENTITY_LOCAL_STORAGE.currentUser.key, defaultUser);
            return defaultUser;
        });
    }
}