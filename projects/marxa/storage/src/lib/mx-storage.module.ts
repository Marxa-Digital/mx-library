import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { MxUploadFilesComponent } from './components/upload-files/upload-files.component';
import { MxUploadModalComponent } from './components/upload-modal/upload-modal.component';
import { MxUploadingSpinnerComponent } from './components/uploading-spinner/uploading-spinner.component';
import { MaterialModule } from '../shared/material.module';

@NgModule({
  declarations: [
    MxUploadFilesComponent,
    MxUploadModalComponent,
    MxUploadingSpinnerComponent,
  ],
  imports: [
    CommonModule,
    NgxDropzoneModule,
    MaterialModule,
  ],
  exports: [
    MxUploadFilesComponent,
    MxUploadModalComponent
  ],
})
export class MxStorageModule {}
