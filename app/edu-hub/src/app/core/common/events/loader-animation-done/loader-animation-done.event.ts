import { AnimationEvent } from "@angular/animations";
import { DEFAULT_HIDDEN_STATE, DEFAULT_VISIBLE_STATE } from "@cross/animation/animation-helper";

export class LoaderAnimationDoneEvent {
    static readonly type = '[EduHub] On Loader Animation Done';

    constructor(public event: AnimationEvent,
        public hiddenState = DEFAULT_HIDDEN_STATE,
        public visibleState = DEFAULT_VISIBLE_STATE) { }
}
