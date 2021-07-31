export class PostViewModel {
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