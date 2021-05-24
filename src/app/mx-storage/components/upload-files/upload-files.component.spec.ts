import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MxUploadFilesComponent } from './upload-files.component';

describe('UploadFilesComponent', () => {
  let component: MxUploadFilesComponent;
  let fixture: ComponentFixture<MxUploadFilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MxUploadFilesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MxUploadFilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
