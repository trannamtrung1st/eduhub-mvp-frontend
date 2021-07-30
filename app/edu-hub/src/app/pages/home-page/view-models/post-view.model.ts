import { MockPost } from "@app/domains/post/models/mock-post.model";

export class PostViewModel implements MockPost {
    title: string;
    thumbnailUrl: string;
    createdTime: Date;
    commentCount: number;
    description: string;
    subjectId: number;

    constructor() {
        this.title = "";
        this.thumbnailUrl = "";
        this.createdTime = new Date();
        this.commentCount = 0;
        this.description = "";
        this.subjectId = 0;
    }
}