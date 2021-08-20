import { A_ROUTING } from "@app/constants";

import { MenuItemModel } from "./models/menu-item.model";

export const MENU = {
    profile: new MenuItemModel('profile', A_ROUTING.management.profile, 'Profile', 'user'),
    medias: new MenuItemModel('medias', A_ROUTING.management.medias.base, 'Medias', 'play-square')
};

export const MENU_ITEMS = Object.values(MENU);