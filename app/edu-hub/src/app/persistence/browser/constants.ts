import { isPlatformBrowser } from "@angular/common";
import { InjectionToken } from "@angular/core";

export const STORAGE_PREFIX = ".edh.";

export const BROWSER_STORAGE = new InjectionToken<any | undefined>('Browser Storage');

export function browserStorageFactory(platformId: object): any | undefined {
    return isPlatformBrowser(platformId) ? sessionStorage : undefined;
}