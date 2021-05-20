import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MxReacvtiveDialogboxComponent } from './mx-reacvtive-dialogbox.component';

describe('GdevReacvtiveDialogboxComponent', () => {
  let component: MxReacvtiveDialogboxComponent;
  let fixture: ComponentFixture<MxReacvtiveDialogboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MxReacvtiveDialogboxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MxReacvtiveDialogboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
