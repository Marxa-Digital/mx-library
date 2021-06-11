import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { iUploadedFile, MxStorage } from '@marxa/storage';
import { Subscription } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';
import { MxSlide } from '../mx-slider.model';

@Component({
  selector: 'mx-slide-edit',
  templateUrl: './mx-slide-edit.component.html',
  styleUrls: ['./mx-slide-edit.component.scss']
})
export class MxSlideEditComponent implements OnInit, OnDestroy {

  slideForm: FormGroup = new FormGroup({
    nombre: new FormControl('', [Validators.required]),
    imageURL: new FormControl('', [Validators.required]),
    enlace: new FormControl(''),
    activado: new FormControl(false),
    newTab: new FormControl(true),
    id: new FormControl('')
  })

  @Input() slide?: MxSlide

  changesSubscription: Subscription
  @Output() changes: EventEmitter<any> = new EventEmitter()
  constructor(
    public storage: MxStorage
  ) {
    this.changesSubscription = this.slideForm.valueChanges
      .pipe(distinctUntilChanged(
          (x, y) => JSON.stringify(x) == JSON.stringify(y)
        )
      ).subscribe(data => {
        this.changes.emit(data)
      })
   }

  ngOnInit(): void {
    if (this.slide) this.slideForm.patchValue(this.slide)
  }

  onFileUploaded(files: iUploadedFile[]) {
    this.slideForm.patchValue({ imageURL: files[0].url })
    if (this.slide) this.slide.imageURL = files[0].url as string
    console.log( this.slide )
  }



  ngOnDestroy(): void {
    this.changesSubscription.unsubscribe()
  }
}
