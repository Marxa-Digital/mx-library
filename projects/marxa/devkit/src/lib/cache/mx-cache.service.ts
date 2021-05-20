import { Injectable } from '@angular/core';
import { Observable, Subject, interval } from 'rxjs';
import {
  startWith,
  take,
  skipWhile,
  map,
  distinctUntilChanged,
} from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class MxCache {
  private waitFor = (ms: number) => new Promise((r) => setTimeout(r, ms));
  cacheTagName: string = 'mx-data';
  storage: 'local' | 'session' = 'session';
  updateChanges$: Subject<any> = new Subject();
  storageData: any;
  localStorage?: string | null;
  sessionStorage?: string | null;

  constructor() {}

  getStorageData() {
    let storage =
      this.storage == 'local'
        ? localStorage.getItem(this.cacheTagName)
        : sessionStorage.getItem(this.cacheTagName);

    return storage != 'undefined' ? JSON.parse(storage as string) : null;
  }

  updateData<T>(key: string, value: any) {
    this.storageData = this.getStorageData();
    if (this.storageData) {
      this.storageData[key] = value;
      this.storage == 'local'
        ? localStorage.setItem(
            this.cacheTagName,
            JSON.stringify(this.storageData)
          )
        : sessionStorage.setItem(
            this.cacheTagName,
            JSON.stringify(this.storageData)
          );
    } else {
      this.storageData = { [key]: value };
      this.storage == 'local'
        ? localStorage.setItem(
            this.cacheTagName,
            JSON.stringify(this.storageData)
          )
        : sessionStorage.setItem(
            this.cacheTagName,
            JSON.stringify(this.storageData)
          );
    }

    this.updateChanges$.next(this.storageData);
    return this.updateChanges$
  }

  listenForChanges<T>(key: string): Observable<T> {
    let data = this.getDataKey<T>(key);
    return this.updateChanges$.pipe(
      map((object) => object[key]),
      startWith(data),
      distinctUntilChanged((x, y) =>
        typeof x != 'object' ? x === y : JSON.stringify(x) === JSON.stringify(y)
      )
    );
  }

  async getFullData() {
    var storageData = this.getStorageData();
    return storageData ? storageData : null;
  }

  getDataKey<T>(key: string) {
    var storageData = this.getStorageData();
    if (storageData) {
      return storageData[key] ? (storageData[key] as T) : null;
    } else {
      return null;
    }
  }

  async getAsyncKey<T>(
    keyExpected: string,
    intervalsToWaitFor?: number,
    iterateSpeed?: number
  ) {
    const intervals = intervalsToWaitFor ? intervalsToWaitFor : 5;
    const timeToWait = interval(iterateSpeed ? iterateSpeed : 1000);

    var result = this.getDataKey<T>(keyExpected);
    if (!result) {
      return new Promise<T | null>((resolve) => {
        timeToWait
          .pipe(
            map((intent) => {
              let result = this.getDataKey<T>(keyExpected);
              return result ? result : intent;
            }),
            skipWhile((result) => {
              if (typeof result == 'number' && result < intervals) {
                return true;
              } else {
                return false;
              }
            }),
            take(1)
          )
          .subscribe(
            (result) => {
              if (result === intervalsToWaitFor) {
                resolve(null);
              } else if (typeof result != 'number') {
                resolve(result as T);
              }
            },
            (error) => console.log(error)
          );
      });
    } else {
      return result;
    }
  }

  deleteDataKey(key: string) {
    var sesData = this.getStorageData();
    if (sesData) {
      delete sesData[key];
      this.storage == 'local'
        ? localStorage.setItem(this.cacheTagName, JSON.stringify(sesData))
        : sessionStorage.setItem(this.cacheTagName, JSON.stringify(sesData));
    }
  }
}

