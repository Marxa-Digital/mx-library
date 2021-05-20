import { UploadingComponent } from './components/image-uploader/uploading-dialog/uploading-dialog.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ImageUploaderComponent } from './components/image-uploader/image-uploader.component';
import { ImagePreviewComponent } from './components/image-uploader/image-preview/image-preview.component';
import { MaterialModule } from 'projects/marxa/devkit/shared/material.module';
import { MxReactiveTextlineComponent } from './components/mx-reactive-textline/mx-reactive-textline.component';
import { MxReacvtiveDialogboxComponent } from './components/mx-reacvtive-dialogbox/mx-reacvtive-dialogbox.component';



@NgModule({
  declarations: [
    ImageUploaderComponent,
    ImagePreviewComponent,
    UploadingComponent,
    MxReactiveTextlineComponent,
    MxReacvtiveDialogboxComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    ImageUploaderComponent,
    MxReactiveTextlineComponent,
    MxReacvtiveDialogboxComponent,
  ]
})
export class MxAdvanceFieldsModule { }
