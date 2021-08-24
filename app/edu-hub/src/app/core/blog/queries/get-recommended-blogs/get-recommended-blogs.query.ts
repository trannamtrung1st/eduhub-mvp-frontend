export class GetRecommendedBlogsQuery {
    static readonly type = '[EduHub] Get Recommended Blogs';

    constructor(public relatedToBlogId: string) {
    }
}