import { APP_STATUS_STATES } from "../states/global.state";

export namespace GlobalCommands {
    export class ChangeAppStatus {
        static readonly type = '[EduHub] Change App Status';

        constructor(public appStatus: string = APP_STATUS_STATES.unset) { }
    }
}