import { MockSubject } from "@app/domains/subject/models/mock-subject.model";

export class SubjectViewModel implements MockSubject {
    id: number;
    name: string;
    selected: boolean;

    constructor() {
        this.id = 0;
        this.name = "";
        this.selected = false;
    }
}