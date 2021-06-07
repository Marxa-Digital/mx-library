import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MxImportFileComponent } from './import-file.component';

describe('ImportFileComponent', () => {
  let component: MxImportFileComponent;
  let fixture: ComponentFixture<MxImportFileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MxImportFileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MxImportFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
