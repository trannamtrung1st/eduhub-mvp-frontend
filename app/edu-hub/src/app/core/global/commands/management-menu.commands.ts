export namespace ManagementMenuCommands {
    export class SetCurrent {
        static readonly type = '[EduHub] Set Current Menu';

        constructor(public currentMenuId: string) { }
    }
}