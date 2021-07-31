export class SubjectViewModel {
    id: number;
    name: string;
    selected: boolean;

    constructor() {
        this.id = 0;
        this.name = "";
        this.selected = false;
    }
}