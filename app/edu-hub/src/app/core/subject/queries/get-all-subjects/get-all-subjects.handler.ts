import { Injectable } from "@angular/core";

import { CoreModule } from "@core/core.module";

import { SubjectModel } from "@core/subject/states/models/subject.model";
import { GetAllSubjectsQuery } from "./get-all-subjects.query";

import { MockDatabaseService } from "@persistence/database/mock-database.service";

@Injectable({
    providedIn: CoreModule
})
export class GetAllSubjectsHandler {
    constructor(private _databaseService: MockDatabaseService) { }

    handle(request: GetAllSubjectsQuery): Promise<SubjectModel[]> {
        return Promise.resolve().then(() => {
            let subjects = [...this._databaseService.database.subjects];
            return subjects;
        });
    }
}