import { SubjectModel } from "./subject.model";

export class SubjectStateModel {

    constructor(public subjects: SubjectModel[] = []) {
    }

    static get default() {
        return new SubjectStateModel();
    }
}
