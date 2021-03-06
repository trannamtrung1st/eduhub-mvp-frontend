import { Inject, Injectable } from '@angular/core';

import { PersistenceModule } from '@persistence/persistence.module';

import { BROWSER_STORAGE, STORAGE_PREFIX } from './constants';

@Injectable({
  providedIn: PersistenceModule
})
export class BrowserStorageService {

  constructor(@Inject(BROWSER_STORAGE) private _browserStorage: any | undefined) {
  }

  removeItem(key: string) {
    key = STORAGE_PREFIX + key;
    this._browserStorage?.removeItem(key);
  }

  getItemAs<T>(key: string): T | null {
    key = STORAGE_PREFIX + key;
    const data = this._browserStorage?.getItem(key);
    return data && JSON.parse(data) as T || null;
  }

  setJson(key: string, value: any) {
    key = STORAGE_PREFIX + key;
    this._browserStorage?.setItem(key, JSON.stringify(value));
  }

  getItem(key: string): string | null {
    key = STORAGE_PREFIX + key;
    return this._browserStorage?.getItem(key);
  }

  setItem(key: string, value: string) {
    key = STORAGE_PREFIX + key;
    this._browserStorage?.setItem(key, value);
  }

  clear() {
    this._browserStorage?.clear();
  }
}
