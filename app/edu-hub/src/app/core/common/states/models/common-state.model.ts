import { DEFAULT_VISIBLE_STATE } from "@cross/animation/animation-helper";

import { APP_STATUS_STATES } from "../common.state";

export class CommonStateModel {

    constructor(public appStatus: string = APP_STATUS_STATES.unset,
        public loaderVisible = true,
        public loaderVisibilityState = DEFAULT_VISIBLE_STATE) { }

    static get default() {
        return new CommonStateModel();
    }
}