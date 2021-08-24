import { Injectable } from "@angular/core";

import { CoreModule } from "@core/core.module";

import { IDENTITY_LOCAL_STORAGE } from "@core/identity/constants";

import { LogoutCommand } from "./log-out.command";

import { BrowserStorageService } from "@persistence/browser/browser-storage.service";

@Injectable({
    providedIn: CoreModule
})
export class LogoutHandler {

    constructor(private _browserStorageService: BrowserStorageService) {
    }

    handle(request: LogoutCommand) {
        this._browserStorageService.removeItem(IDENTITY_LOCAL_STORAGE.currentUser.key);
    }
}