import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import { finalize, tap } from 'rxjs/operators';
import { BehaviorSubject, Observable, Subject, Subscriber, Subscription } from 'rxjs';
import firebase from 'firebase/app'
import { ExportToCsv } from 'export-to-csv';

import { iUploadedFile, iUploadInfo, RawValue } from './mx-storage.model';
import { MxUploadingSpinnerComponent } from './components/uploading-spinner/uploading-spinner.component';
import { ErrorColumnsRequiredComponent } from './components/import-file/error-columns-required/error-columns-required.component';





@Injectable({
  providedIn: 'root'
})
export class MxStorage {


  /** Defines the path where the files are stored.
   * If path is not provided, will stored in root
   * @type {string}
   */
  public path: string = ''

  /** Define a prefix for every name of uploaded file.  If prefix is not provided, not will be.
   * @type {string}
   */
  public prefixName: string = ''
  /** Optional metadata for all files uploaded
   * @type {Object}
   */
  public metadata?: Object
  public showDropzone: boolean = false
  public files: any[] = []

  public fileUploadedStatus$: Subject<iUploadedFile> = new Subject()
  public upload$: Subject<void> = new Subject()
  public uploadComplete$: Subject<iUploadedFile[]> = new Subject()
  public clearDropzone$: Subject<void> = new Subject()
  public closeImportDialog$: Subject<void> = new Subject()
  public closeSpinner$: Subject<void> = new Subject()

  public recordsLength: number = 0
  public importCol: string = 'imports'
  public idField: string = ''
  public requiredColumns: string[] = []
  public mergeImport: boolean = true
  public headerMap: Map<string, string> = new Map()

  private valueHeaderMap: Map<string, number> =  new Map();
  private csvRecordsArray: any[] = []
  private csvHeadersArray: any[] = []

  public importState$: BehaviorSubject<string> = new BehaviorSubject('')
  public recordsReaded$: BehaviorSubject<number> = new BehaviorSubject(0);

  private loadingActive: boolean = false
  public fileSubscription?: Subscription

  constructor(
    private _aStorage: AngularFireStorage,
    private _dialog: MatDialog,
    private _afs: AngularFirestore
  ) {
  }

  public waitFor = (ms: number) => new Promise( r => setTimeout(r,ms))

  public upload() {
    this.upload$.next()
    return this.uploadComplete$.pipe
      (tap(() => { this.fileSubscription?.unsubscribe() }))
  }

  public uploadFile(file: any, path: string, prefixName?: string | null, metadata?: any):
    Observable<iUploadedFile> {

    metadata = metadata ? {
      customMetadata: metadata
    } as firebase.storage.UploadMetadata
      : null


    const
      fileName = prefixName ? `${prefixName}-${file.name}` : file.name,
      format = file.type,
      filePath = `${path}/${fileName}`,
      ref = this._aStorage.ref(filePath),
      task = this._aStorage.upload(filePath, file, metadata);


    task.percentageChanges().subscribe(uploadedState => {
      this.fileUploadedStatus$.next({ uploadedState })
    })

    task.snapshotChanges().pipe(
      finalize(() => {
        ref.getDownloadURL().subscribe((url) => {
          // Response
          let uploadedFile: iUploadedFile = {
            fileName, url, format, path,
            uploadedState: true,
            uploaded: new Date(),
          }
          if (metadata) uploadedFile['metadata'] = metadata
          this.fileUploadedStatus$.next(uploadedFile)


        });
      })
    )
      .subscribe();

    return this.fileUploadedStatus$
  }

  public async deleteFiles(files: iUploadInfo[], path?: string) {
    try {
      await this.asyncForEach(files, ((file: iUploadInfo) => {
        this._aStorage.ref(`${path ? path : file.path}/${file.fileName}`).delete()
      }))

    } catch (error) {
      console.error(error)
    }
  }

  public validateLength(array?: any[]): boolean {
    return array && array.length > 0 ? true : false
  }


  public async asyncForEach(array: any[], callback: any) {
    for (let index = 0; index < array.length; index++) {
      await callback(array[index], index, array);
    }
  }


  public async compareDimensions(file: any, equals: boolean) {
    const fileAsDataURL = window.URL.createObjectURL(file)
    const dimensions: iImageDimensions = await this.getHeightAndWidthFromDataUrl(fileAsDataURL)
    if (equals) {
      return dimensions.width === dimensions.height ? true : false;
    } else {
      return dimensions.width === dimensions.height ? false : true
    }
  }


  public async getHeightAndWidthFromDataUrl(dataURL: any) {
    return new Promise<iImageDimensions>(resolve => {
      const img = new Image()
      img.onload = () => {
        resolve({
          height: img.height,
          width: img.width
        })
      }
      img.src = dataURL
    })
  }


  public toggleLoading() {
    this.loadingActive = !this.loadingActive
    if (this.loadingActive) {
      this._dialog.open(MxUploadingSpinnerComponent)
    } else {
      this._dialog.closeAll()
    }
  }

  public async downloadList(list: any[], filename: string) {
    ExportOptions['filename'] = filename ? filename : ExportOptions.filename
    let listRaw: any[] = []
    const csvExporter = new ExportToCsv(ExportOptions);

    await this.asyncForEach(list, async (item: any) => {
      let row = await this.getRawValue(item)
      listRaw.push(row)
      return
    })
    csvExporter.generateCsv(listRaw)
    return
  }


  public async getRawValue(value: any) {
    let headerKeys = Object.keys(value)
    let rawValue: RawValue = {};

    await this.asyncForEach(headerKeys, async (key: any) => {
      if (typeof value[key] === 'object') {
        let object = value[key]
        Object.keys(object).forEach(sh => {
          if (typeof object[sh] === 'object') {
            let subObject = object[sh]
            Object.keys(subObject).forEach(ssh => {
              Object.defineProperty(rawValue, `${key}.${sh}.${ssh}`, {
                value: subObject[ssh],
                enumerable: true,
                writable: true,
                configurable: true,
              })
              return
            })
          } else {
            Object.defineProperty(rawValue, `${key}.${sh}`, {
              value: object[sh],
              enumerable: true,
              writable: true,
              configurable: true
            })
            return
          }
        })
      } else {
        rawValue[key] = value[key]
        return
      }
    })
    return rawValue
  }



  private readFile() {
    let reader = new FileReader();
    reader.readAsText(this.files[0])

    reader.onload = async () => {
      let csvData = reader.result;
      this.csvRecordsArray = (csvData as any).split(/\r\n|\n/);
    };
    reader.onerror = function () {
      console.error('Ocurrió un error mientras se leía el archivo!');
    };
    return reader
  }



  public async importFile(collection?: string, idField?: string, mergeImport?: boolean) {
    this.importCol = collection ? collection : this.importCol
    this.idField = idField ? idField : this.idField
    if (mergeImport === false) { this.mergeImport = false}

    let reader = new FileReader();
    reader.readAsText(this.files[0])

    reader.onload = async () => {
      let csvData = reader.result;
      this.csvRecordsArray = (csvData as any).split(/\r\n|\n/);
      await this.getValueHeaderMap(this.csvRecordsArray)
      await this.uploadRecords(this.csvRecordsArray)
    };
    reader.onerror = function () {
      console.error('Ocurrió un error mientras se leía el archivo!');
    };


  }


  private async uploadRecords(records: any[]) {
    this.importCol = this.importCol ? this.importCol : 'imports'
    this.idField = this.idField ? this.normalize(this.idField.trim()) : ''

    const colRef = this._afs.collection(this.importCol).ref

    const batchArray: (firebase.firestore.WriteBatch)[] = [];
    batchArray.push(this._afs.firestore.batch());
    let batchIndex = 0;
    let batchAmount = 0;

    records.splice(0, 1)
    this.recordsLength = records.length

    try {
      await this.asyncForEach(records, async (record: string, index: number) => {
        try {
          let currentRecord = record.split(',')
          if (currentRecord.length === this.valueHeaderMap.size) {
            let record = this.setNewRecord(currentRecord, index)
            let recordId = this.normalize(record[this.idField].toLowerCase().trim())
            recordId = recordId
              .replace(/\//g, '_')
              .replace(/\./g, '_')
              .replace(/,/g, '_')
              .replace(/@/g, '_')
              .replace(/\s/g, '_')
              .replace(/\"/g, '')

            batchArray[batchIndex].set(colRef.doc(recordId), record, {merge: this.mergeImport})
            let count = this.recordsReaded$.getValue();
            count++;
            batchAmount++
            await this.waitFor(50)
            // console.log(batchIndex, batchAmount)
            if (batchAmount === 499) {
              batchArray.push(this._afs.firestore.batch());
              batchIndex++;
              batchAmount = 0
              await this.waitFor(1000)
            }
            this.recordsReaded$.next(count)
            this.importState$.next(`Cargando fila ${count}`)
            return
          }
        } catch (error) {
          this.recordsReaded$.next(this.recordsLength)
          this.closeImportDialog$.next()
          this.recordsReaded$.next(0)
          this._dialog.open(ErrorColumnsRequiredComponent, {
            data: error.message
          })
          console.error(error)
        }
      })

      await this.asyncForEach(batchArray,
        async (currentBatch: firebase.firestore.WriteBatch, index: number) => {
          this.importState$.next(`Cargando a base de datos: Lote ${index}`)
          await currentBatch.commit()
          await this.waitFor(2000)
          return
        })

      this.importState$.next(`${this.recordsLength} registros cargados`)
      this.uploadComplete$.next()
      this.showDropzone = false
      this.files = []
      this.recordsReaded$.next(0)
    } catch (error) {
      console.error(error)
      this.recordsReaded$.next(this.recordsLength)
      this.closeImportDialog$.next()
      this.recordsReaded$.next(0)
      this._dialog.open(ErrorColumnsRequiredComponent, {
        data: error.message
      })
      // this._alerts.sendError('Error', error)
    }
  }


  private setNewRecord(recordArray: string[], row: number) {
    let nuevo: any = {}
    this.valueHeaderMap.forEach((index, field) => {
      let valid = true
      this.requiredColumns.forEach((col: any) => {
        let req = this.valueHeaderMap.get(col)
        if (req && !recordArray[req]) {
          valid = false
          throw { message: `No se pudo encontrar ${col} en la fila ${row}` }
        }
      })
      if (valid) nuevo[field] = recordArray[index]
    })
    return nuevo
  }

  rawHeadersList$: BehaviorSubject<string[]> = new BehaviorSubject([''])
  public RawHeaderList(): Observable<string[]> {
    let reader = new FileReader();
    reader.readAsText(this.files[0])

    return Observable.create((observer: Subscriber<any[]>) => {

      reader.onload = async () => {
        let csvData = reader.result;
        this.csvRecordsArray = (csvData as any).split(/\r\n|\n/);
        this.csvHeadersArray = this.csvRecordsArray[0].split(',')
        observer.next(this.csvHeadersArray)
        this.rawHeadersList$.next(this.csvHeadersArray)
        observer.complete();
      };
      reader.onerror = function () {
        console.error('Ocurrió un error mientras se leía el archivo!');
      };
    })


  }



  private getValueHeaderMap(csvRecordsArr: any) {
    let fileHeaders: string[] = (csvRecordsArr[0]).split(',');
    this.importState$.next('Renombrando columnas')
    fileHeaders.forEach((header, index) => {
      header = header.trim()
      let syn = this.headerMap.get(header)?.trim()
      if (syn) this.valueHeaderMap.set(this.normalize(syn), index)
      else this.valueHeaderMap.set(this.normalize(header), index)
    })
    return
  }


  normalize(text: string) {
    var from = "ÃÀÁÄÂÈÉËÊÌÍÏÎÒÓÖÔÙÚÜÛãàáäâèéëêìíïîòóöôùúüûÑñÇç",
        to = "AAAAAEEEEIIIIOOOOUUUUaaaaaeeeeiiiioooouuuunncc",
        mapping:any = {};

    for ( var i = 0, j = from.length; i < j; i++ )
        mapping[ from.charAt( i ) ] = to.charAt( i );

        var ret = [];
        for ( var i = 0, j = text.length; i < j; i++ ) {
            var c = text.charAt( i );
            if ( mapping.hasOwnProperty( text.charAt( i ) ) )
                ret.push( mapping[ c ] );
            else
                ret.push( c );
        }
        return ret.join( '' );
  }

  replaceChartFor(text: string,  chartList: string[], chart: string) {
    chartList.forEach(ch => {
      let regx = new RegExp(ch, "g")
      text = text.replace(regx, chart)
    })
    return text
  }

}


export const ExportOptions = {
  fieldSeparator: ',',
  quoteStrings: '"',
  decimalSeparator: '.',
  showLabels: true,
  showTitle: false,
  useTextFile: false,
  useBom: true,
  useKeysAsHeaders: true,
  filename: 'report '+new Date()
  // headers: ['Column 1', 'Column 2', etc...] <-- Won't work with useKeysAsHeaders present!
};

export interface iImageDimensions {
  height: number,
  width: number
}

