import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MxStorage } from '../../mx-storage.service';

@Component({
  templateUrl: './dialog-rename-columns.component.html',
  styleUrls: ['./dialog-rename-columns.component.scss']
})
export class DialogRenameColumnsComponent implements OnInit {

  constructor(
    public storage: MxStorage,
    public dialog: MatDialogRef<DialogRenameColumnsComponent>
  ) { }

  ngOnInit(): void {
  }

  changeColName(current: string, event: any): void {
    let name = event.target.value
    this.storage.headerMap.set(current, name)
  }

  onClose(): void {
    this.storage.rawHeadersList$.getValue().forEach(header => {
      let inMap = this.storage.headerMap.get(header)
      if (!inMap) { this.storage.headerMap.set(header, header)}
    })
    this.dialog.close()
  }
}
