export const UNSUPPORTED_WIDTH = 1024;

// Routing
interface AppRouting {
    home: string;
    login: string;
    registration: string;
    videoDetail: string;
    blogDetail: string;
    notFound: string;
    accessDenied: string;
}

export const ROUTING: AppRouting = {
    home: '',
    login: 'login',
    registration: 'registration',
    videoDetail: 'video/:id',
    blogDetail: 'blog/:id',
    notFound: 'not-found',
    accessDenied: 'access-denied'
};

let copyRoutes: any = {
    ...ROUTING
};
Object.keys(copyRoutes).forEach(key => {
    copyRoutes[key] = '/' + copyRoutes[key];
});
export const A_ROUTING: AppRouting = copyRoutes;