import { Injectable } from "@angular/core";

import { orderBy } from "lodash";

import { BlogFilterSortBy } from "@core/blog/constants";

import { BlogModel } from "@core/blog/states/models/blog.model";
import { FilterResponseModel } from "@cross/filter/models/filter-response.model";
import { FilterBlogQuery } from "./filter-blog.query";

import { MockDatabaseService } from "@persistence/database/mock-database.service";

import { CoreModule } from "@core/core.module";

@Injectable({
    providedIn: CoreModule
})
export class FilterBlogHandler {

    constructor(private _databaseService: MockDatabaseService) { }

    handle(request: FilterBlogQuery): Promise<FilterResponseModel<BlogModel>> {
        return Promise.resolve().then(() => {
            const srcBlogs = this._databaseService.database.blogs;
            let blogs = [...srcBlogs];

            if (request.searchTerm) {
                const searchTerm = request.searchTerm?.toLowerCase();
                blogs = blogs.filter(blog => blog.title.toLowerCase().includes(searchTerm));
            }

            if (request.subjects?.length) {
                blogs = blogs.filter(blog => request.subjects.includes(blog.subjectId));
            }

            switch (request.sortBy) {
                case BlogFilterSortBy.Title:
                    blogs = orderBy(blogs, blog => blog.title, request.isDesc ? 'desc' : 'asc');
                    break;
            }

            const totalRecords = blogs.length;
            blogs = blogs.slice(request.skip, request.skip + request.take);

            return new FilterResponseModel(blogs, totalRecords);
        });
    }
}
