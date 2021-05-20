import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MxUploadingSpinnerComponent } from './uploading-spinner.component';

describe('UploadingSpinnerComponent', () => {
  let component: MxUploadingSpinnerComponent;
  let fixture: ComponentFixture<MxUploadingSpinnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MxUploadingSpinnerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MxUploadingSpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
