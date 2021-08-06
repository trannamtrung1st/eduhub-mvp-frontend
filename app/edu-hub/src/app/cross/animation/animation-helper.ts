import { animate, state, style, transition, trigger } from "@angular/animations";

export const DEFAULT_VISIBILITY_NAME = 'visibility';
export const DEFAULT_HIDDEN_STATE = 'hidden';
export const DEFAULT_VISIBLE_STATE = 'visible';
export const DEFAULT_ANIMATION = animate('500ms ease-out');

export const fading = (settings = {
    name: DEFAULT_VISIBILITY_NAME,
    visibleStateName: DEFAULT_VISIBLE_STATE,
    hiddenStateName: DEFAULT_HIDDEN_STATE,
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