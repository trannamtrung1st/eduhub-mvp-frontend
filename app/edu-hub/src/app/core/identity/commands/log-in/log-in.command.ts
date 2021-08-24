export class LoginCommand {
    static readonly type = '[EduHub] Log in User';

    constructor(public username: string, public password: string) {
    }
}