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

  /** Etiqueta con la que se guarda en el storage. DEFAULT 'mx-data' */
  public cacheTagName: string = 'mx-data';
  /** Elige si es Local Storage o Session Storage donde se guardará la data. DEFAULT: 'local' */
  public storage: 'local' | 'session' = 'local';

  private updateChanges$: Subject<any> = new Subject();
  private storageData: any;

  constructor() {}

  /** Obtiene el objeto alojado en el storage con el nombre asignado
   * @returns {*}  {*}
   */
  private getStorageData(): any {
    let storage =
      this.storage == 'local'
        ? localStorage.getItem(this.cacheTagName)
        : sessionStorage.getItem(this.cacheTagName);

    return storage != 'undefined' ? JSON.parse(storage as string) : null;
  }


  /** Agrega información al objeto alojado o no en el storage. Si no es está alojado, crea el objeto.
   * @template T
   * @param {string} key Nombre con el que se guardará el dato
   * @param {*} value Valor que se guardará
   * @returns {*} Observable de todos los cambios del valor asignado
   */
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
    return this.updateChanges$.pipe(
      map((object) => object[key]),
      distinctUntilChanged((x, y) =>
        typeof x != 'object' ? x === y : JSON.stringify(x) === JSON.stringify(y)
      )
    );
  }


  /** Escucha los cambios de la parte del objeto storage asignado
   * @template T Tipado del valor que se solicita
   * @param {string} key Selector en el objeto storage
   * @returns {*}  {Observable<T>} Observable de los cambios de la propiedad seleccionada
   */
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


  /** Retorna el objeto storage completo
   * @returns {*} Objeto storage completo o `null`
   */
  async getFullData(): Promise<any> {
    var storageData = this.getStorageData();
    return storageData ? storageData : null;
  }


  /** Obtiene la propiedad  seleccionada directamente
   * @template T Tipado del valor que se solicita
   * @param {string} key Selector en el objeto storage
   * @returns {*} Propiedad del objeto storage seleccionada
   */
  getDataKey<T>(key: string) {
    var storageData = this.getStorageData();
    if (storageData) {
      return storageData[key] ? (storageData[key] as T) : null;
    } else {
      return null;
    }
  }


  /** Retorna la propiedad del objeto storage seleccioanda en forma de promesa.
   * Puede esperar a que la propiedad exista o intenta volver a obtener el valor si no existe.
   * @template T Tipado del valor que se solicita
   * @param {string} keyExpected Selector en el objeto storage
   * @param {number} [intervalsToWaitFor] OPCIONAL Veces que se intentará obtener el valor. DEFAULT: 5
   * @param {number} [iterateSpeed] OPCIONAL Tiempo de espera entre intentos por obtener el valor. DEFAULT: 1000 (1s)
   * @returns {*}
   */
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
            map((intent) =>  this.getDataKey<T>(keyExpected) || intent ),
            skipWhile(result => typeof result == 'number' && result < intervals ),
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


  /** Elimina la propiedad seleccionada del objeto storage
   * @param {string} key Selector en el objeto storage
   */
  deleteDataKey(key: string): void {
    var sesData = this.getStorageData();
    if (sesData) {
      delete sesData[key];
      this.storage == 'local'
        ? localStorage.setItem(this.cacheTagName, JSON.stringify(sesData))
        : sessionStorage.setItem(this.cacheTagName, JSON.stringify(sesData));
    }
  }
}

