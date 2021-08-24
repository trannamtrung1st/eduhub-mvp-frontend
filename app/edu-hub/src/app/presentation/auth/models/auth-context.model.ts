import { UserModel } from "@core/identity/states/models/user-model";
import { AuthResult } from "./auth-result.model";

export class AuthContext {
    constructor(public isAuthenticated: boolean, public user?: UserModel,
        public authResult: AuthResult = new AuthResult()) {
    }
}