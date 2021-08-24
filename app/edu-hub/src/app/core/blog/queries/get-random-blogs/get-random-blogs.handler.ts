import { Injectable } from "@angular/core";

import { random } from "lodash";

import { BlogModel } from "@core/blog/states/models/blog.model";
import { GetRandomBlogsQuery } from "./get-random-blogs.query";

import { MockDatabaseService } from "@persistence/database/mock-database.service";

import { CoreModule } from "@core/core.module";

@Injectable({
    providedIn: CoreModule
})
export class GetRandomBlogsHandler {

    constructor(private _databaseService: MockDatabaseService) { }

    handle(request: GetRandomBlogsQuery): Promise<BlogModel[]> {
        return Promise.resolve().then(() => {
            const srcBlogs = this._databaseService.database.blogs;
            let blogs = [...srcBlogs].splice(0, random(srcBlogs.length));
            return blogs;
        });
    }
}
