import {Injectable} from '@angular/core';


/**
 * Manages a serialized Map in local storage.
 */
@Injectable()
export class LocalStorageKeyValueService {

  private localStorageKey = 'app-map';

  set(key: string, value: string): void {
    const object = this.fromStorage();
    object[key] = value;
    this.toStorage(object);
  }

  get(key: string) {
    return this.fromStorage()[key];
  }

  private toStorage(map: object): void {
    const serialized = JSON.stringify(map);
    localStorage.setItem(this.localStorageKey, serialized);
  }

  private fromStorage(): object {
    let serializedObject = localStorage.getItem(this.localStorageKey);
    if (!serializedObject) {
      localStorage.setItem(this.localStorageKey, JSON.stringify({}));
      serializedObject = localStorage.getItem(this.localStorageKey);
    }
    return JSON.parse(serializedObject);
  }
}
