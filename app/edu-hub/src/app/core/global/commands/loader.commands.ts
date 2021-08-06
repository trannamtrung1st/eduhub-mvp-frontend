import { AnimationEvent } from "@angular/animations";

import { DEFAULT_HIDDEN_STATE, DEFAULT_VISIBLE_STATE } from "@cross/animation/animation-helper";

export namespace LoaderCommands {
    export class Show {
        static readonly type = '[EduHub] Show App Loader';

        constructor(public visibleState: string = DEFAULT_VISIBLE_STATE) { }
    }

    export class Hide {
        static readonly type = '[EduHub] Hide App Loader';

        constructor(public hiddenState: string = DEFAULT_HIDDEN_STATE) { }
    }

    export class AnimationDone {
        static readonly type = '[EduHub] On Loader Animation Done';

        constructor(public event: AnimationEvent,
            public hiddenState = DEFAULT_HIDDEN_STATE,
            public visibleState = DEFAULT_VISIBLE_STATE) { }
    }

    export class Reset {
        static readonly type = '[EduHub] Reset App Loader';
    }
}