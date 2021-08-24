import { APP_STATUS_STATES } from "@core/common/states/common.state";

export class ChangeAppStatusCommand {
    static readonly type = '[EduHub] Change App Status';

    constructor(public appStatus: string = APP_STATUS_STATES.unset) { }
}
