import { Injectable } from "@angular/core";

import { BlogModel } from "@core/blog/states/models/blog.model";
import { GetRecommendedBlogsQuery } from "./get-recommended-blogs.query";

import { MockDatabaseService } from "@persistence/database/mock-database.service";

import { CoreModule } from "@core/core.module";

@Injectable({
    providedIn: CoreModule
})
export class GetRecommendedBlogsHandler {

    constructor(private _databaseService: MockDatabaseService) { }

    handle(request: GetRecommendedBlogsQuery): Promise<BlogModel[]> {
        return Promise.resolve().then(() => {
            const srcBlogs = this._databaseService.database.blogs;
            let blogs = [...srcBlogs].splice(0, 10);
            return blogs;
        });
    }
}
