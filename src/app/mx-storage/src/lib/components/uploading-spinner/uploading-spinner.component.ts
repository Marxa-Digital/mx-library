import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';


@Component({
  templateUrl: './uploading-spinner.component.html',
  styleUrls: ['./uploading-spinner.component.scss']
})
export class MxUploadingSpinnerComponent implements OnInit, OnDestroy{

  @ViewChild('spinner') private spinner?: ElementRef

  constructor() {}

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    let dialog = document.querySelector('.mat-dialog-container') as HTMLElement;
    if (dialog) dialog.style.backgroundColor = "white"
  }

}
