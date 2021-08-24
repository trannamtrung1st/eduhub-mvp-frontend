import { FilterResponseModel } from "@cross/filter/models/filter-response.model";
import { BlogModel } from "./blog.model";

export class BlogStateModel {

    constructor(public filteredBlogs = new FilterResponseModel<BlogModel>(),
        public recommendedBlogs: BlogModel[] = [],
        public randomBlogs: BlogModel[] = []) { }

    static get default() {
        return new BlogStateModel();
    }
}
