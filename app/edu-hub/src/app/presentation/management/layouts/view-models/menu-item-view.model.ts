import { MenuItemModel } from "../models/menu-item.model";

export class MenuItemViewModel extends MenuItemModel {
    constructor(model: MenuItemModel,
        public active: boolean = false) {
        super(model.id, model.url, model.title, model.icon);
    }
}