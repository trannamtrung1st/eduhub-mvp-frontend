export class PostViewModel {
    thumbnailUrl?: string;

    constructor(public id: string,
        public title: string,
        public subjectId: number,
        public createdTime: Date = new Date(),
        public commentCount: number = 0,
        public description: string = "") {
    }
}