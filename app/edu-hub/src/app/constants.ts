export const UNSUPPORTED_WIDTH = 1024;

// Routing
interface AppRouting {
    home: string;
    login: string;
    registration: string;
    videoDetail: string;
}

export const ROUTING: AppRouting = {
    home: '',
    login: 'login',
    registration: 'registration',
    videoDetail: 'video/:id'
};

let copyRoutes: any = {
    ...ROUTING
};
Object.keys(copyRoutes).forEach(key => {
    copyRoutes[key] = '/' + copyRoutes[key];
});
export const A_ROUTING: AppRouting = copyRoutes;