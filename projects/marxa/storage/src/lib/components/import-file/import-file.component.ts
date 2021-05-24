import { Component, OnInit, ChangeDetectionStrategy, Input, ViewChild, ElementRef, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { take, takeWhile } from 'rxjs/operators';
import { importOptions } from '../../mx-storage.model';
import { MxStorage } from '../../mx-storage.service';
import { DialogImportComponent } from '../dialog-import/dialog-import.component';
import { DialogRenameColumnsComponent } from '../dialog-rename-columns/dialog-rename-columns.component';
import { ErrorColumnsRequiredComponent } from './error-columns-required/error-columns-required.component';

@Component({
  selector: 'mx-import-file',
  templateUrl: './import-file.component.html',
  styleUrls: ['./import-file.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MxImportFileComponent implements OnInit, AfterViewInit {

  @Input() importCol: string = 'imports'
  @Input() idField: string = ''
  @Input() renameColumns: boolean = false
  @Input() requiredColumns: string[] = []
  @Output() invalid: EventEmitter<boolean> = new EventEmitter()


  constructor(
    public storage: MxStorage,
    private _dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    if (this.importCol) this.storage.importCol = this.importCol
    if (this.idField) this.storage.idField = this.idField
  }

  ngAfterViewInit() {

  }

  validateRequiredColumns() {
    return new Promise((resolve) => {
      if (this.requiredColumns.length > 0) {
        let validate = false
        this.storage.RawHeaderList()
          .pipe(takeWhile(list => list.length > 0, true))
          .subscribe(async list => {
          list = list.map(c => this.storage.normalize(c.toLowerCase().trim()))
          await this.storage.asyncForEach(this.requiredColumns,
            (reqColumn: string) => {
              let column = this.storage.normalize( reqColumn.toLowerCase().trim())
              if (!list.includes(column)) {
                validate = false
                this._dialog.open(ErrorColumnsRequiredComponent, { data: reqColumn })
              }
              else validate = true
            })
          if (validate) resolve(validate)
          else this.invalid.emit(true)
        })
      }
    })
  }


  async openColumns() {
    let valid = await this.validateRequiredColumns()
    if (this.renameColumns && valid) {
      this._dialog.open(DialogRenameColumnsComponent, {
        minWidth: '50%',
        maxWidth: '80%',
        disableClose: true,
      })
    }
  }


  onImport() {
    this._dialog.open(DialogImportComponent, {
      minWidth: '50%',
      maxWidth: '80%',
      disableClose: true
    }).afterClosed().pipe(take(1)).subscribe(() => {
      this.storage.files = []
      this.storage.showDropzone = false
    })
    this.storage.importFile()
  }

}
