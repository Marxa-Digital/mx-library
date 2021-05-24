import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MxStorage } from '../../mx-storage.service';

@Component({
  templateUrl: './dialog-import.component.html',
  styleUrls: ['./dialog-import.component.scss']
})
export class DialogImportComponent implements OnInit {

  progress: number = 0
  constructor(
    public storage: MxStorage,
    public dialog: MatDialogRef<DialogImportComponent>
  ) {
    this.storage.recordsReaded.subscribe(cant => {
      this.progress = (100 / this.storage.recordsLength) * cant
    })
  }


  ngOnInit(): void {
  }

}
