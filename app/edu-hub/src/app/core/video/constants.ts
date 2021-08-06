export const VIDEO_STATES = {
    video: {
        name: 'video',
        filteredVideos: {
            name: 'filteredVideos',
            states: {}
        },
        currentWatchingVideo: {
            name: 'currentWatching',
            states: {
                getDetail: {
                    success: 'success',
                    notFound: 'notFound',
                    error: 'error',
                    unset: 'unset'
                }
            }
        }
    }
};

export enum VideoFilterSortBy {
    Rating = 1,
    PostedTime = 2,
    Title = 3
}