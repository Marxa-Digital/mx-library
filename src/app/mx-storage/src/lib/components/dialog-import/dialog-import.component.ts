import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { MxStorage } from '../../mx-storage.service';

@Component({
  templateUrl: './dialog-import.component.html',
  styleUrls: ['./dialog-import.component.scss']
})
export class DialogImportComponent implements OnInit, OnDestroy{

  progress: number = 0
  closeSubscription: Subscription
  recordsSubscription: Subscription
  complete: boolean = false
  @Output() onComplete: EventEmitter<number> = new EventEmitter()
  constructor(
    public storage: MxStorage,
    public dialog: MatDialogRef<DialogImportComponent>
  ) {
    this.closeSubscription = this.storage.closeImportDialog$
      .pipe(take(1))
      .subscribe(() => this.dialog.close())
    this.recordsSubscription = this.storage.recordsReaded$
      .subscribe(uploadedCant => {
        this.progress = (100 / this.storage.recordsLength) * uploadedCant
        if (uploadedCant == this.storage.recordsLength) {
          this.complete = true
          this.onComplete.emit(this.storage.recordsLength)
        }
    })
  }


  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.closeSubscription.unsubscribe()
    this.recordsSubscription.unsubscribe()
  }

}
