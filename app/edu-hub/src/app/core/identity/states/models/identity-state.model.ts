import { UserModel } from "./user-model";

export class IdentityStateModel {

    constructor(public currentUser?: UserModel) {
    }

    static get default() {
        return new IdentityStateModel();
    }
}