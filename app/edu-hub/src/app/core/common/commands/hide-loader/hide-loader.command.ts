import { DEFAULT_HIDDEN_STATE } from "@cross/animation/animation-helper";

export class HideLoaderCommand {
    static readonly type = '[EduHub] Hide App Loader';

    constructor(public hiddenState: string = DEFAULT_HIDDEN_STATE) { }
}