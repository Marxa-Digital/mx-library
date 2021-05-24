import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogRenameColumnsComponent } from './dialog-rename-columns.component';

describe('DialogRenameColumnsComponent', () => {
  let component: DialogRenameColumnsComponent;
  let fixture: ComponentFixture<DialogRenameColumnsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogRenameColumnsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogRenameColumnsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
