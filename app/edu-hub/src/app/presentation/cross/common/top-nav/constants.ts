import { A_ROUTING } from "@app/constants";

import { NavItem } from "./models/nav-item.model";

export const NAV_ITEMS: NavItem[] = [
    { display: 'Home', url: A_ROUTING.platform.home },
    { display: 'Feedback', url: A_ROUTING.platform.feedback },
]