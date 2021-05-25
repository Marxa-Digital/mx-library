import firebase from "firebase/app"

/** File uploaded on Firebase Storage information */
export interface iUploadInfo {
  fileName?: string;
  /** Is uploaded in `Date` type but is downloaded from Firebase Firestore as `firestore.Timestamp` */
  uploaded?: Date | firebase.firestore.Timestamp,
  metadata?: any
  /** File format
   * @example image/jpg */
  format?: string,
  path?: string
}

/** Result of file uploaded to Firebase Storage */
export interface iUploadedFile extends iUploadInfo{
  /** Firebase Storage url to access file */
  url?: string;
  /** Works only form uploadState */
  uploadedState?: number | true
}

/** Upload options */
export interface iUploadOptions {
  path: string
  prefixName?: string
  metadata?: Object
  multiple?: boolean
  maxFileSize?: number
  showDropzone?: boolean
  uploadButton?: boolean
  uploadStatus?: boolean
  toggleButtonLabel?: string
  uploadButtonLabel?: string
  dropzoneLabel?: string
  /** Beta, not implemented yet */
  compareDimensions?: 'equals' | 'notEquals'
}

export interface RawValue {
  [value: string]:any
}
