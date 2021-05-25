import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MxFilesPickerComponent } from './files-picker.component';

describe('UploadFilesComponent', () => {
  let component: MxFilesPickerComponent;
  let fixture: ComponentFixture<MxFilesPickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MxFilesPickerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MxFilesPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
