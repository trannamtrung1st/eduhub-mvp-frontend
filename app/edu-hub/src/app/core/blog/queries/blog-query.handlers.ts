import { FilterBlogHandler } from "./filter-blog/filter-blog.handler";
import { GetRandomBlogsHandler } from "./get-random-blogs/get-random-blogs.handler";
import { GetRecommendedBlogsHandler } from "./get-recommended-blogs/get-recommended-blogs.handler";

const BlogQueryHandlers = null;

export {
    FilterBlogHandler as Filter,
    GetRandomBlogsHandler as GetRandom,
    GetRecommendedBlogsHandler as GetRecommended,
    BlogQueryHandlers
}
