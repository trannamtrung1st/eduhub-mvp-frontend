import { DEFAULT_VISIBLE_STATE } from "@cross/animation/animation-helper";

export class ShowLoaderCommand {
    static readonly type = '[EduHub] Show App Loader';

    constructor(public visibleState: string = DEFAULT_VISIBLE_STATE) { }
}