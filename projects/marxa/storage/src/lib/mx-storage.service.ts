import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { BehaviorSubject, Observable, Subject, Subscriber, Subscription } from 'rxjs';
import firebase from 'firebase/app'
import { finalize, tap } from 'rxjs/operators';
import { iUploadedFile, iUploadInfo, RawValue } from './mx-storage.model';
import { MatDialog } from '@angular/material/dialog';
import { MxUploadingSpinnerComponent } from './components/uploading-spinner/uploading-spinner.component';

import { ExportToCsv } from 'export-to-csv';
import { AngularFirestore } from '@angular/fire/firestore';




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
  public files: any[] = []
  public fileUploadedStatus$:
    Subject<iUploadedFile> = new Subject()
  public upload$: Subject<void> = new Subject()
  public uploadComplete$: Subject<iUploadedFile[]> = new Subject
  public showDropzone: boolean = false
  public clearDropzone: Subject<void> = new Subject()
  public closeSpinner: Subject<void> = new Subject()
  public fileSubscription?: Subscription
  loadingActive: boolean = false
  valueHeaderMap: Map<string, number> = new Map();
  recordsReaded: BehaviorSubject<number> = new BehaviorSubject(0);
  recordsLength: number = 0
  state$: BehaviorSubject<string> = new BehaviorSubject('')
  csvRecordsArray: any[] = []
  csvHeadersArray: any[] = []
  importCol: string = 'imports'
  idField: string = ''
  public requiredHeaders: string[] = []
  public headerMap: Map<string, string> = new Map()

  constructor(
    private _aStorage: AngularFireStorage,
    private _dialog: MatDialog,
    private _afs: AngularFirestore
  ) { }

  upload() {
    this.upload$.next()
    return this.uploadComplete$.pipe
      (tap(() => { this.fileSubscription?.unsubscribe() }))
  }

  uploadFile(file: any, path: string, prefixName?: string | null, metadata?: any):
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
            fileName, url, format,
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

  async deleteFiles(files: iUploadInfo[], path: string) {
    try {
      await this.asyncForEach(files, ((file: iUploadInfo) => {
        this._aStorage.ref(`${path}/${file.fileName}`).delete()
      }))

    } catch (error) {
      console.error(error)
    }
  }

  validateLength(array?: any[]): boolean {
    return array && array.length > 0 ? true : false
  }


  async asyncForEach(array: any[], callback: any) {
    for (let index = 0; index < array.length; index++) {
      await callback(array[index], index, array);
    }
  }


  async compareDimensions(file: any, equals: boolean) {
    const fileAsDataURL = window.URL.createObjectURL(file)
    const dimensions: iImageDimensions = await this.getHeightAndWidthFromDataUrl(fileAsDataURL)
    if (equals) {
      return dimensions.width === dimensions.height ? true : false;
    } else {
      return dimensions.width === dimensions.height ? false : true
    }
  }


  async getHeightAndWidthFromDataUrl(dataURL: any) {
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


  toggleLoading() {
    this.loadingActive = !this.loadingActive
    if (this.loadingActive) {
      this._dialog.open(MxUploadingSpinnerComponent)
    } else {
      this._dialog.closeAll()
    }
  }

  async downloadList(list: any[], filename: string) {
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


  async getRawValue(value: any) {
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



  async importFile(collection?: string, idField?: string) {
    this.importCol = collection ? collection : ''
    this.idField = idField ? idField : ''

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
    this.idField = this.idField ?
      this.normalize(this.idField.toLowerCase().trim()) : ''
    const colRef = this._afs.collection(this.importCol).ref
    const batch = this._afs.firestore.batch()
    const batchArray: (firebase.firestore.WriteBatch)[] = [];
    batchArray.push(batch);
    let batchIndex = 0;

    records.splice(0, 1)
    this.recordsLength = records.length
    await this.asyncForEach(records, async (record: string, index: number) => {
      try {
        let currentRecord = record.split(',')
        if (currentRecord.length === this.valueHeaderMap.size) {
          let record = this.setNewRecord(currentRecord, index)

          batchArray[batchIndex].set(colRef.doc(record[this.idField]), record)
          let count = this.recordsReaded.getValue()
          count++
          if (count === 499) {
            batchArray.push(batch);
            batchIndex++;
            this.recordsReaded.next(0)
          } else {
            this.recordsReaded.next(count)
          }
          return
        }
      } catch (error) { console.error(error) }
    })

    await this.asyncForEach(batchArray,
      async (batch: firebase.firestore.WriteBatch) => {
        await batch.commit()
        return
      })

    this.state$.next(`${this.recordsLength} registros cargados`)
    this.showDropzone = false
    this.files = []
  }


  private setNewRecord(recordArray: string[], index: number) {
    let nuevo: any = {}
    this.valueHeaderMap.forEach((index, field) => {
      if (recordArray[index]) nuevo[field] = recordArray[index]
      else throw new Error(`No se pudo encontrar ${field} en la fila ${index}`)
    })
    return nuevo
  }

  rawHeadersList$: BehaviorSubject<string[]> = new BehaviorSubject([''])
  RawHeaderList(): Observable<string[]> {
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
    this.state$.next('Renombrando columnas')
    fileHeaders.forEach((header, index) => {
      header = header.toLowerCase().trim()
      let syn = this.headerMap.get(header)?.toLowerCase().trim()
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

}


const ExportOptions = {
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

