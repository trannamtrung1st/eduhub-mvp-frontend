export interface MockPost {
    id: string;
    title: string;
    thumbnailUrl?: string;
    createdTime: Date;
    commentCount: number;
    description: string;
    subjectId: number;
}