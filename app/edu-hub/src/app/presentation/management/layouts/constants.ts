import { A_ROUTING } from "@app/constants";

import { MenuItemModel } from "./models/menu-item.model";

export const MENU = {
    profile: new MenuItemModel('profile', A_ROUTING.management.profile, 'Profile', 'user'),
    others: new MenuItemModel('others', '#', 'Others', 'user')
};

export const MENU_ITEMS = Object.values(MENU);