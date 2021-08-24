export class GetRecommendedVideosQuery {
    static readonly type = '[EduHub] Get Recommended Videos';

    constructor(public relatedToVideoId: string) {
    }
}