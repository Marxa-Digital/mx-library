import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MxUploadModalComponent } from './upload-modal.component';

describe('UploadModalComponent', () => {
  let component: MxUploadModalComponent;
  let fixture: ComponentFixture<MxUploadModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MxUploadModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MxUploadModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
