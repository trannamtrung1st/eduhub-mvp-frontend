export namespace IdentityCommands {
    export class Login {
        static readonly type = '[EduHub] Log in User';

        constructor(public username: string, public password: string) {
        }
    }

    export class Logout {
        static readonly type = '[EduHub] Log out User';

        constructor() {
        }
    }

    export class LoadCurrentUser {
        static readonly type = '[EduHub] Load current user';
    }
}