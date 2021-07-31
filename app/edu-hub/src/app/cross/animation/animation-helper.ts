import { animate, AnimationEvent, state, style, transition, trigger } from "@angular/animations";

const VISIBILITY_NAME = 'visibility';
const HIDDEN_STATE = 'hidden';
const VISIBLE_STATE = 'visible';
const DEFAULT_ANIMATION = animate('500ms ease-out');

export const fading = (settings = {
    name: VISIBILITY_NAME,
    visibleStateName: VISIBLE_STATE,
    hiddenStateName: HIDDEN_STATE,
    fadeOutAnimation: DEFAULT_ANIMATION,
    fadeInAnimation: DEFAULT_ANIMATION
}) => {
    const { name, hiddenStateName, visibleStateName, fadeOutAnimation, fadeInAnimation } = settings;
    return trigger(name, [
        state(visibleStateName, style({
            opacity: 1
        })),
        state(hiddenStateName, style({
            opacity: 0
        })),
        transition(`* => ${hiddenStateName}`, [
            fadeOutAnimation,
        ]),
        transition(`* => ${visibleStateName}`, [
            fadeInAnimation,
        ]),
    ])
};

export class VisibilityController {
    visible: boolean;
    state: string;

    private _hiddenState: string;
    private _visibleState: string;

    constructor(hiddenState = HIDDEN_STATE, visibleState = VISIBLE_STATE) {
        this.visible = true;
        this.state = visibleState;
        this._hiddenState = hiddenState;
        this._visibleState = visibleState;
    }

    show() {
        this.state = this._visibleState;
    }

    hide() {
        this.state = this._hiddenState;
    }

    toggle() {
        this.state = this.state === this._visibleState ? this._hiddenState : this._visibleState;
    }

    onAnimationDone(event: AnimationEvent) {
        switch (event.toState) {
            case this._hiddenState:
                this.visible = false;
                break;
            case this._visibleState:
                this.visible = true;
                break;
        }
    }
}